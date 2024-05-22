import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { AddressElement, Vault } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { Tag } from 'lucide-react';
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
    const newAddresAsVault = {
      id: Date.now().toString(),
      type: {
        id: addressType,
        label: addressType,
        icon: Tag,
      },
      elements: [
        {
          address: newAddress.address,
          name: newAddress.name,
        },
      ],
    } as Vault<AddressElement>;

    setSpaces((prevSpaces) =>
      prevSpaces.map((space) => {
        if (space.id !== spaceId) return space;
        return {
          ...space,
          vaults: space.vaults.map((address) =>
            address.id === newAddress.id ? newAddresAsVault : address
          ),
        };
      })
    );
  };

  return editAddress;
};

export default useEditAddress;
