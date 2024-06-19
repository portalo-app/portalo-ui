'use client';

import SpaceForm from '@components/spaces/SpaceForm';
import { ROUTES } from '@constants/routes.const';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

interface CreateSpaceProps {}

const CreateSpace: NextPage<CreateSpaceProps> = () => {
  const router = useRouter();

  return (
    <SpaceForm action="CREATE" onComplete={() => router.push(ROUTES.APP)} />
  );
};

export default CreateSpace;
