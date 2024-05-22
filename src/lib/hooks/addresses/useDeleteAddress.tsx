import { ADDRESS_TYPE } from '@models/address';
import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type DeleteAddress = (
  spaceId: string,
  addressId: string,
  addressType: ADDRESS_TYPE
) => void;

type UseDeleteAddress = () => DeleteAddress;

const useDeleteAddress: UseDeleteAddress = () => {
  const setSpaces = useSetRecoilState(spacesState);

  const deleteAddress: DeleteAddress = (spaceId, addressId) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) => {
        if (space.id !== spaceId) return space;

        return {
          ...space,
          vaults: space.vaults.filter((address) => address.id !== addressId),
        };
      })
    );
  };

  return deleteAddress;
};

export default useDeleteAddress;
