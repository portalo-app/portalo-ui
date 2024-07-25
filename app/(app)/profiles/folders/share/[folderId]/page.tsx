import FolderShare from '@components/folders/FolderShare';
import { FC } from 'react';

interface PageParams {
  params: { folderId: string };
}

const Page: FC<PageParams> = ({ params }) => {
  const { folderId } = params;
  return <FolderShare folderId={folderId} />;
};

export default Page;
