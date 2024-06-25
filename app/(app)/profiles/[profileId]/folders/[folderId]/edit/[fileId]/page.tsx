import FolderFileContainer from '@components/files/FolderFileContainer';

interface EditFilePageProps {
  params: { folderId: string; profileId: string; fileId: string };
}

const NewFilePage: React.FC<EditFilePageProps> = ({ params }) => {
  const { folderId, profileId, fileId } = params;

  return (
    <FolderFileContainer
      profileId={profileId}
      folderId={folderId}
      fileId={fileId}
      action="edit"
    />
  );
};

export default NewFilePage;
