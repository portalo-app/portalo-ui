import PageLayout from '@/components/layout/PageLayout';
import CreateProfileForm from '@/components/profiles/CreateProfileForm';
import { ROUTES } from '@/lib/constants/routes.const';
import { useRouter } from 'next/router';

interface CreateProfileProps {}

const CreateProfile: React.FC<CreateProfileProps> = () => {
  const createProfileTitle = 'Create Profile';
  const router = useRouter();

  return (
    <PageLayout title={createProfileTitle} backPath={ROUTES.APP}>
      <CreateProfileForm onCreate={() => router.push(ROUTES.APP)} />
    </PageLayout>
  );
};

export default CreateProfile;
