import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { Profile } from '@models/business/profile';
import { mapperProfileToProfileDTO } from '@models/mappers/profileMapper';
import { profilesState } from '@states/profiles.atom';
import { useSetRecoilState } from 'recoil';

type CreateProfile = (name: string) => void;

type UseCreateProfile = () => CreateProfile;

const useCreateProfile: UseCreateProfile = () => {
  const { trackCreateProfile } = useAnalytics();
  const setProfiles = useSetRecoilState(profilesState);

  const createProfile: CreateProfile = (name: string) => {
    const profile = new Profile(name);

    setProfiles((profiles) => [
      ...profiles,
      mapperProfileToProfileDTO(profile),
    ]);
    trackCreateProfile(profile.id);
  };

  return createProfile;
};

export default useCreateProfile;
