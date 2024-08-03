import ManageAccess from '@components/profiles/ManageAccess';
import React from 'react';

interface ManageAccessPageProps {
  params: { profileId: string };
}

const ManageAccessPage: React.FC<ManageAccessPageProps> = ({ params }) => {
  const { profileId } = params;

  return <ManageAccess profileId={profileId} />;
};

export default ManageAccessPage;
