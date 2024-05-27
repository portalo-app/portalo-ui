'use client';

import PageLayout from '@components/layout/PageLayout';
import SpaceForm from '@components/spaces/SpaceForm';
import { ROUTES } from '@constants/routes.const';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

interface CreateSpaceProps {}

const CreateSpace: NextPage<CreateSpaceProps> = () => {
  const router = useRouter();

  const createSpaceTitle = 'Create Space';

  return (
    <PageLayout title={createSpaceTitle} backPath={ROUTES.APP}>
      <SpaceForm action="CREATE" onComplete={() => router.push(ROUTES.APP)} />
    </PageLayout>
  );
};

export default CreateSpace;
