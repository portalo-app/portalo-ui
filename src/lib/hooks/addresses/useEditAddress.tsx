import { AddressType, CryptoAddress, FIATAddress } from '@/lib/model/address';
import { profilesState } from '@/lib/store/profiles.atom';
import { useRecoilState } from 'recoil';

type EditAddress = (
  profileId: string,
  addressType: AddressType,
  newAddress: CryptoAddress | FIATAddress
) => void;

type UseEditAddress = () => EditAddress;

const useEditAddress: UseEditAddress = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);

  const editAddress: EditAddress = (profileId, addressType, newAddress) => {
    const profile = profiles.find((profile) => profile.id === profileId);

    if (!profile) return;

    const newProfile = { ...profile };

    if (addressType === 'CRYPTO') {
      newProfile.cryptoAddresses = profile.cryptoAddresses.map((address) =>
        address.id === newAddress.id ? newAddress : address
      );
    } else {
      newProfile.fiatAddresses = profile.fiatAddresses.map((address) =>
        address.id === newAddress.id ? newAddress : address
      );
    }

    const newProfiles = profiles.map((profile) =>
      profile.id === profileId ? newProfile : profile
    );

    setProfiles(newProfiles);
  };

  return editAddress;
};

export default useEditAddress;
