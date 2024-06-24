import FolderFileContainer from '@components/files/FolderFileContainer';

interface EditFilePageProps {
  params: { folderId: string; spaceId: string; fileId: string };
}

const NewFilePage: React.FC<EditFilePageProps> = ({ params }) => {
  const { folderId, spaceId, fileId } = params;

  return (
    <FolderFileContainer
      spaceId={spaceId}
      folderId={folderId}
      fileId={fileId}
      action="edit"
    />
  );
};

export default NewFilePage;
