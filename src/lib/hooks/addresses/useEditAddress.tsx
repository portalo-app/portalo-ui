import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type EditAddress = (
  spaceId: string,
  addressType: ADDRESS_TYPE,
  newAddress: CryptoAddress | FIATAddress
) => void;

type UseEditAddress = () => EditAddress;

const useEditAddress: UseEditAddress = () => {
  const setSpaces = useSetRecoilState(spacesState);

  const editAddress: EditAddress = (spaceId, addressType, newAddress) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) => {
        if (space.id !== spaceId) return space;

        const addressKey =
          addressType === ADDRESS_TYPE.CRYPTO
            ? 'cryptoAddresses'
            : 'fiatAddresses';

        return {
          ...space,
          [addressKey]: space[addressKey].map((address) =>
            address.id === newAddress.id ? newAddress : address
          ),
        };
      })
    );
  };

  return editAddress;
};

export default useEditAddress;
