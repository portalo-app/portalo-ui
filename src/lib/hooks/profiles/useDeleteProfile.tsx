import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { profilesState } from '@states/profiles.atom';
import { useSetRecoilState } from 'recoil';

type DeleteProfile = (id: string) => void;

type UseDeleteProfile = () => DeleteProfile;

const useDeleteProfile: UseDeleteProfile = () => {
  const setProfiles = useSetRecoilState(profilesState);
  const { trackDeleteProfile } = useAnalytics();

  const deleteProfile: DeleteProfile = (id: string) => {
    setProfiles((profiles) => profiles.filter((profile) => profile.id !== id));
    trackDeleteProfile(id);
  };

  return deleteProfile;
};

export default useDeleteProfile;
