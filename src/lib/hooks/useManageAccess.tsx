import { User } from '@models/business/user';

type GrantGlobalAccess = (profileId: string) => void;
type RevokeAccessToProfile = (user: User, profileId: string) => void;

const UseManageAccess = () => {
  const grantGlobalAccess: GrantGlobalAccess = (
    profileId: string
  ): string[] => {};

  const revokeAccessToProfile: RevokeAccessToProfile = (
    user: User,
    profileId: string
  ): void => {};
};

export default UseManageAccess;
