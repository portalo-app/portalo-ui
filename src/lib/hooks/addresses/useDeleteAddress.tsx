import { AddressType } from '@/lib/model/address';
import { profilesState } from '@/lib/store/profiles.atom';
import { useSetRecoilState } from 'recoil';

type DeleteAddress = (
  profileId: string,
  addressId: string,
  addressType: AddressType
) => void;

type UseDeleteAddress = () => DeleteAddress;

const useDeleteAddress: UseDeleteAddress = () => {
  const setProfiles = useSetRecoilState(profilesState);

  const deleteAddress = (
    profileId: string,
    addressId: string,
    addressType: AddressType
  ) => {
    setProfiles((profiles) => {
      const profile = profiles.find((p) => p.id === profileId);
      if (!profile) return profiles;

      let updatedProfile = null;
      if (addressType === 'CRYPTO') {
        updatedProfile = {
          ...profile,
          cryptoAddresses: profile.cryptoAddresses.filter(
            (a) => a.id !== addressId
          ),
        };
      } else {
        updatedProfile = {
          ...profile,
          fiatAddresses: profile.fiatAddresses.filter(
            (a) => a.id !== addressId
          ),
        };
      }

      return [...profiles.filter((p) => p.id !== profileId), updatedProfile];
    });
  };

  return deleteAddress;
};

export default useDeleteAddress;
