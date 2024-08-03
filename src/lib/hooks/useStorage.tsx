import { Profile } from '@models/business/profile';

type StoreProfile = (profileId: string, profile: Profile) => void;

const UseStorage = () => {
  const storeProfile: StoreProfile = (
    profileId: string,
    profile: Profile
  ): void => {};
};
