'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyH1 } from '@core/ui/Typography';
import { Folder, FolderFile } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import FolderFileForm from './FolderFileForm';

interface FolderFileContainerProps {
  spaceId: string;
  folderId: string;
  fileId?: string;
  action: 'new' | 'edit';
}

const FolderFileContainer: FC<FolderFileContainerProps> = ({
  spaceId,
  folderId,
  action,
  fileId,
}) => {
  const [folder, setFolder] = useState<Folder<FolderFile> | null>(null);
  const [file, setFile] = useState<FolderFile | null>(null);

  const spacesData = useRecoilValue(spacesState);
  const router = useRouter();

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

    if (action === 'edit' && fileId) {
      const selectedFile = selectedFolder.files.find(
        (file) => file.id === fileId
      );

      if (!selectedFile) {
        router.push(
          `${ROUTES.APP_SPACE}/${spaceId}${ROUTES.APP_FOLDER}/${folderId}`
        );
        return;
      }

      setFile(selectedFile);
    }

    setFolder(selectedFolder);
  }, [spacesData, spaceId, folderId, router, action, fileId]);

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1>
        {action === 'new' ? 'Add' : 'Edit'} {folderId}
      </TypographyH1>

      {folder && (
        <FolderFileForm
          spaceId={spaceId}
          folderId={folderId}
          folderType={folder?.type}
          initialData={file || undefined}
          onComplete={() =>
            router.push(
              `${ROUTES.APP_SPACE}/${spaceId}${ROUTES.APP_FOLDER}/${folderId}`
            )
          }
          action={action}
        />
      )}
    </div>
  );
};

export default FolderFileContainer;
