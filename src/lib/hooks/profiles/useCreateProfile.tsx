import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { Profile } from '@models/business/profile';
import { DEFAULT_FOLDERS } from '@models/profile.data';
import { profilesState } from '@states/profiles.atom';
import { useSetRecoilState } from 'recoil';

type CreateProfile = (name: string) => void;

type UseCreateProfile = () => CreateProfile;

const useCreateProfile: UseCreateProfile = () => {
  const { trackCreateProfile } = useAnalytics();
  const setProfiles = useSetRecoilState(profilesState);

  const createProfile: CreateProfile = (name: string) => {
    const profile: Profile = {
      id: Date.now().toString(),
      name,
      folders: [...DEFAULT_FOLDERS],
    };

    setProfiles((profiles) => [...profiles, profile]);
    trackCreateProfile(profile.id);
  };

  return createProfile;
};

export default useCreateProfile;
