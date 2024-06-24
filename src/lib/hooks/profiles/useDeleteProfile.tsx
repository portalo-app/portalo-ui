import { profilesState } from '@states/profiles.atom';
import { useSetRecoilState } from 'recoil';

type DeleteProfile = (id: string) => void;

type UseDeleteProfile = () => DeleteProfile;

const useDeleteProfile: UseDeleteProfile = () => {
  const setProfiles = useSetRecoilState(profilesState);

  const deleteProfile: DeleteProfile = (id: string) => {
    setProfiles((profiles) => profiles.filter((profile) => profile.id !== id));
  };

  return deleteProfile;
};

export default useDeleteProfile;
