import FolderFileContainer from '@components/files/FolderFileContainer';

interface NewFilePageProps {
  params: { folderId: string; spaceId: string };
}

const NewFilePage: React.FC<NewFilePageProps> = ({ params }) => {
  const { folderId, spaceId } = params;

  return (
    <FolderFileContainer spaceId={spaceId} folderId={folderId} action="new" />
  );
};

export default NewFilePage;
