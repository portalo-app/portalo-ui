import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type CreateAddress = (
  spaceId: string,
  addressType: ADDRESS_TYPE,
  newAddress: CryptoAddress | FIATAddress
) => void;

type UseCreateAddress = () => CreateAddress;

const useCreateAddress: UseCreateAddress = () => {
  const setSpaces = useSetRecoilState(spacesState);

  const createAddress: CreateAddress = (spaceId, addressType, newAddress) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) => {
        if (space.id !== spaceId) return space;

        const address = { ...newAddress, id: Date.now().toString() };

        if (addressType === ADDRESS_TYPE.CRYPTO) {
          return {
            ...space,
            cryptoAddresses: [...space.cryptoAddresses, address],
          };
        } else {
          return { ...space, fiatAddresses: [...space.fiatAddresses, address] };
        }
      })
    );
  };

  return createAddress;
};

export default useCreateAddress;
