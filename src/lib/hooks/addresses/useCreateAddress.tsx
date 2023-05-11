import { AddressType, CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import { useRecoilState } from 'recoil';

type CreateAddress = (
  profileId: string,
  addressType: AddressType,
  newAddress: CryptoAddress | FIATAddress
) => void;

type UseCreateAddress = () => CreateAddress;

const useCreateAddress: UseCreateAddress = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);

  const createAddress: CreateAddress = (profileId, addressType, newAddress) => {
    const profile = profiles.find((profile) => profile.id === profileId);

    if (!profile) return;

    const newProfile: Profile = { ...profile };
    const address = { ...newAddress, id: Date.now().toString() };

    if (addressType === 'CRYPTO') {
      newProfile.cryptoAddresses = [...profile.cryptoAddresses, address];
    } else {
      newProfile.fiatAddresses = [...profile.fiatAddresses, address];
    }

    const newProfiles = profiles.map((profile) =>
      profile.id === profileId ? newProfile : profile
    );

    setProfiles(newProfiles);
  };

  return createAddress;
};

export default useCreateAddress;
