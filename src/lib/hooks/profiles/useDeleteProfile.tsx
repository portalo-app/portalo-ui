import { profilesState } from '@/lib/store/profiles.atom';
import { useSetRecoilState } from 'recoil';

type DeleteProfile = (id: string) => void;

type UseDeleteProfile = () => DeleteProfile;

const useDeleteProfile: UseDeleteProfile = () => {
  const setProfiles = useSetRecoilState(profilesState);

  const deleteProfile: DeleteProfile = (id: string) => {
    setProfiles((profiles) => profiles.filter((p) => p.id !== id));
  };

  return deleteProfile;
};

export default useDeleteProfile;
