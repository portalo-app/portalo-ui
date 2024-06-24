'use client';

import FileItem from '@components/files/FileItem';
import FolderTitle from '@components/folders/FolderTitle';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { Folder, FolderFile, Space } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface FolderDetailsProps {
  params: { folderId: string; spaceId: string };
}

const FolderDetail: NextPage<FolderDetailsProps> = ({ params }) => {
  const router = useRouter();
  const [space, setSpace] = useState<Space | null>(null);
  const [folder, setFolder] = useState<Folder<FolderFile> | null>(null);
  const pathName = usePathname();

  const spacesData = useRecoilValue(spacesState);
  const { folderId, spaceId } = params;

  useEffect(() => {
    if (!spaceId) return;

    const selectedSpace = spacesData.find((space) => space.id === spaceId);
    const selectedFolder = selectedSpace?.folders.find(
      (folder) => folder.id === folderId
    );

    if (!selectedSpace || !selectedFolder) {
      router.push(ROUTES.APP);
      return;
    }

    setSpace(selectedSpace);
    setFolder(selectedFolder);
  }, [spacesData, spaceId, folderId, router]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FolderTitle space={space!} folder={folder!} />

        <CreateButton href={`${pathName}/new`} />
      </div>

      {/* <div>VARIANT FILTER</div> */}

      <div className="space-y-4">
        {folder?.files?.length ?? 0 > 0 ? (
          folder?.files.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              spaceId={spaceId}
              folderId={folderId}
            />
          ))
        ) : (
          <State
            type="empty"
            label="You don't have any files yet"
            action={{
              label: 'Create File',
              onClick: () => router.push(`${pathName}/new`),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FolderDetail;
