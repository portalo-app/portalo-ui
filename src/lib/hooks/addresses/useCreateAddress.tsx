import { AddressElement, Vault } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type CreateAddress = (spaceId: string, newAddress: AddressElement) => void;

type UseCreateAddress = () => CreateAddress;

const useCreateAddress: UseCreateAddress = () => {
  const setSpaces = useSetRecoilState(spacesState);

  const createAddress: CreateAddress = (spaceId, newAddress) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) => {
        if (space.id !== spaceId) return space;

        const address = { ...newAddress, id: Date.now().toString() };

        return {
          ...space,
          vaults: [...space.vaults, address] as Vault<AddressElement>[],
        };
      })
    );
  };

  return createAddress;
};

export default useCreateAddress;
