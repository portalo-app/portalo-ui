import PageLayout from '@/components/layout/PageLayout';
import ProfileForm from '@/components/profiles/ProfileForm';
import { ROUTES } from '@/lib/constants/routes.const';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface CreateProfileProps {}

const CreateProfile: NextPage<CreateProfileProps> = () => {
  const createProfileTitle = 'Create Profile';
  const router = useRouter();

  return (
    <PageLayout title={createProfileTitle} backPath={ROUTES.APP}>
      <ProfileForm action="CREATE" onComplete={() => router.push(ROUTES.APP)} />
    </PageLayout>
  );
};

export default CreateProfile;
