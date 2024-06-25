import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { profilesState } from '@states/profiles.atom';
import { useRecoilState } from 'recoil';

type EditProfile = (id: string, name: string) => void;

type UseEditProfile = () => EditProfile;

const useEditProfile: UseEditProfile = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);
  const { trackEditProfile } = useAnalytics();

  const editProfile: EditProfile = (id: string, name: string) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id === id) {
        return {
          ...profile,
          name,
        };
      }
      return profile;
    });

    trackEditProfile(id);
    setProfiles(newProfiles);
  };

  return editProfile;
};

export default useEditProfile;
