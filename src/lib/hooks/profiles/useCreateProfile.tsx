import { Profile } from '@models/profile';
import { DEFAULT_FOLDERS } from '@models/profile.data';
import { profilesState } from '@states/profiles.atom';
import { useSetRecoilState } from 'recoil';

type CreateProfile = (name: string) => void;

type UseCreateProfile = () => CreateProfile;

const useCreateProfile: UseCreateProfile = () => {
  const setProfiles = useSetRecoilState(profilesState);

  const createProfile: CreateProfile = (name: string) => {
    const profile: Profile = {
      id: Date.now().toString(),
      name,
      folders: [...DEFAULT_FOLDERS],
    };

    setProfiles((profiles) => [...profiles, profile]);
  };

  return createProfile;
};

export default useCreateProfile;
