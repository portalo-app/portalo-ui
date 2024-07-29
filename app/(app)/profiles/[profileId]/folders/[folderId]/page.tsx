import Folder from '@components/profiles/FolderDetail';
import { NextPage } from 'next';

interface FolderPageProps {
  params: { folderId: string; profileId: string };
}

const FolderPage: NextPage<FolderPageProps> = ({ params }) => {
  const { folderId, profileId } = params;

  return <Folder folderId={folderId} profileId={profileId} />;
};

export default FolderPage;
