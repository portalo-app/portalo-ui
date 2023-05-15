import { profilesState } from '@/lib/store/profiles.atom';
import { useRecoilState } from 'recoil';

type EditProfile = (id: string, name: string, password: string) => void;

type UseEditProfile = () => EditProfile;

const useEditProfile: UseEditProfile = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);

  const editProfile: EditProfile = (
    id: string,
    name: string,
    password: string
  ) => {
    const newProfiles = profiles.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          name,
          password,
        };
      }
      return p;
    });

    setProfiles(newProfiles);
  };

  return editProfile;
};

export default useEditProfile;
