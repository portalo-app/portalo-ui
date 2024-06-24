import { profilesState } from '@states/profiles.atom';
import { useRecoilState } from 'recoil';

type EditProfile = (id: string, name: string) => void;

type UseEditProfile = () => EditProfile;

const useEditProfile: UseEditProfile = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);

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

    setProfiles(newProfiles);
  };

  return editProfile;
};

export default useEditProfile;
