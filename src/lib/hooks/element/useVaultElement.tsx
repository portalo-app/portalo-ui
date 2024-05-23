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

  const createElement = (
    spaceId: string,
    vaultId: string,
    newElement: VaultElement
  ) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      return {
        ...space,
        vaults: space.vaults.map((vault) => {
          if (vault.id !== vaultId) return vault;
          return {
            ...vault,
            elements: [...vault.elements, newElement],
          } as Vault<AddressElement> | Vault<SocialElement>;
        }),
      };
    });

    setSpaces(newSpaces);
  };

  return { createElement };
};

export default useVaultElement;
