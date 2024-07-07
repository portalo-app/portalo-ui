'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyH1 } from '@core/ui/Typography';
import useFolderType from '@hooks/useFolderType';
import { profilesState } from '@states/profiles.atom';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import FileForm from './FileForm';

interface FileContainerProps {
  profileId: string;
  folderId: string;
  fileId?: string;
  action: 'new' | 'edit';
}

const FileContainer: FC<FileContainerProps> = ({
  profileId,
  folderId,
  action,
  fileId,
}) => {
  const profilesData = useRecoilValue(profilesState);
  const router = useRouter();

  const folder = useMemo(
    () =>
      profilesData
        .find((profile) => profile.id === profileId)
        ?.folders.find((folder) => folder.id === folderId),
    [profilesData, profileId, folderId]
  );
  const file = useMemo(
    () => folder?.files.find((file) => file.id === fileId),
    [folder, fileId]
  );
  const folderType = useFolderType(folder?.folderTypeId);

  if (!profileId || !folder) {
    router.push(ROUTES.APP);
    return;
  }

  if (action === 'edit' && !file) {
    router.push(
      `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}`
    );
    return;
  }

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1 className="self-center capitalize flex items-center text-primary">
        {folderId}
      </TypographyH1>

      {folder && folderType && (
        <FileForm
          profileId={profileId}
          folderId={folderId}
          folderType={folderType}
          initialData={file}
          onComplete={() =>
            router.push(
              `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}`
            )
          }
          action={action}
        />
      )}
    </div>
  );
};

export default FileContainer;
