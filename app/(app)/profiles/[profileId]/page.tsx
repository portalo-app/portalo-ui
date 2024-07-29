import Profile from '@components/profiles/Profile';
import { NextPage } from 'next';

interface ProfilePageProps {
  params: { profileId: string };
}

const ProfilePage: NextPage<ProfilePageProps> = ({ params }) => {
  const { profileId } = params;
  return <Profile profileId={profileId} />;
};

export default ProfilePage;
