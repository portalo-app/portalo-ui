import FolderFileContainer from '@components/files/FolderFileContainer';

interface NewFilePageProps {
  params: { folderId: string; profileId: string };
}

const NewFilePage: React.FC<NewFilePageProps> = ({ params }) => {
  const { folderId, profileId } = params;

  return (
    <FolderFileContainer
      profileId={profileId}
      folderId={folderId}
      action="new"
    />
  );
};

export default NewFilePage;
