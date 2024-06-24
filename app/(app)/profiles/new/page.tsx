'use client';

import ProfileForm from '@components/profiles/ProfileForm';
import { ROUTES } from '@constants/routes.const';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

interface CreateProfileProps {}

const CreateProfile: NextPage<CreateProfileProps> = () => {
  const router = useRouter();

  return (
    <ProfileForm action="CREATE" onComplete={() => router.push(ROUTES.APP)} />
  );
};

export default CreateProfile;
