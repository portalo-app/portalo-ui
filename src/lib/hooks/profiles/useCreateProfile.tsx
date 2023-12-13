import { Profile } from '@models/profile';
import { profilesState } from '@states/profiles.atom';
import { useSetRecoilState } from 'recoil';

type CreateProfile = (name: string, password: string) => void;

type UseCreateProfile = () => CreateProfile;

const useCreateProfile: UseCreateProfile = () => {
  const setProfiles = useSetRecoilState(profilesState);

  const createProfile: CreateProfile = (name: string, password: string) => {
    const profile: Profile = {
      id: Date.now().toString(),
      name,
      password,
      cryptoAddresses: [],
      fiatAddresses: [],
    };

    setProfiles((profiles) => [...profiles, profile]);
  };

  return createProfile;
};

export default useCreateProfile;
