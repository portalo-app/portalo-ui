import PageLayout from '@/components/layout/PageLayout';
import CreateProfileForm from '@/components/profiles/CreateProfileForm';
import { ROUTES } from '@/lib/constants/routes.const';

interface CreateProfileProps {}

const CreateProfile: React.FC<CreateProfileProps> = () => {
  const createProfileTitle = 'Create Profile';

  return (
    <PageLayout title={createProfileTitle} backPath={ROUTES.APP}>
      <CreateProfileForm />
    </PageLayout>
  );
};

export default CreateProfile;
