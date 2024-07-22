import FolderDetail from '@components/profiles/FolderDetail';
import { NextPage } from 'next';

interface FolderDetailsPageProps {
  params: { folderId: string; profileId: string };
}

const FolderDetailPage: NextPage<FolderDetailsPageProps> = ({ params }) => {
  const { folderId, profileId } = params;
  return <FolderDetail folderId={folderId} profileId={profileId} />;
};

export default FolderDetailPage;
