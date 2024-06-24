import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { getSocialUrlByUsername } from '@models/social.entities';
import {
  AddressElement,
  SocialElement,
  Vault,
  VaultElement,
} from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useRecoilState } from 'recoil';

const useVaultElement = () => {
  const [spaces, setSpaces] = useRecoilState(spacesState);
  const { trackCreateFile, trackDeleteFile, trackEditFile } = useAnalytics();

  const createElement = (
    spaceId: string,
    vaultId: string,
    newElement: VaultElement
  ) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      newElement.id = `${newElement.entity.label}-${Date.now()}`;

      return {
        ...space,
        vaults: space.vaults.map((vault) => {
          if (vault.id !== vaultId) return vault;

          if (vault.type.id === 'social') {
            (newElement as SocialElement).url = getSocialUrlByUsername(
              newElement.entity,
              (newElement as SocialElement).username
            );
          }

          return {
            ...vault,
            elements: [...vault.elements, newElement],
          } as Vault<AddressElement> | Vault<SocialElement>;
        }),
      };
    });
    trackCreateFile(vaultId);
    setSpaces(newSpaces);
  };

  const editElement = (
    spaceId: string,
    vaultId: string,
    editedElement: VaultElement
  ) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      return {
        ...space,
        vaults: space.vaults.map((vault) => {
          if (vault.id !== vaultId) return vault;

          if (vault.type.id === 'social') {
            (editedElement as SocialElement).url = getSocialUrlByUsername(
              editedElement.entity,
              (editedElement as SocialElement).username
            );
          }

          return {
            ...vault,
            elements: vault.elements.map((element) => {
              if (element.id !== editedElement.id) return element;

              return editedElement;
            }),
          } as Vault<AddressElement> | Vault<SocialElement>;
        }),
      };
    });
    trackEditFile(vaultId);
    setSpaces(newSpaces);
  };

  const deleteElement = (
    spaceId: string,
    vaultId: string,
    elementId: string
  ) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      return {
        ...space,
        vaults: space.vaults.map((vault) => {
          if (vault.id !== vaultId) return vault;

          return {
            ...vault,
            elements: vault.elements.filter(
              (element) => element.id !== elementId
            ),
          } as Vault<AddressElement> | Vault<SocialElement>;
        }),
      };
    });

    trackDeleteFile(vaultId);
    setSpaces(newSpaces);
  };

  return { createElement, editElement, deleteElement };
};

export default useVaultElement;
