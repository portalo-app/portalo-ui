'use client';

import { ROUTES } from '@constants/routes.const';
import Icon from '@core/ui/Icon';
import { Separator } from '@core/ui/Separator';
import { TypographyH2 } from '@core/ui/Typography';
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

  const { getFolderType } = useFolderType();

  if (!folder) return;

  const folderType = getFolderType(folder.folderTypeId);

  if (!profileId || !folder || !folderType) {
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
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Icon
          size={30}
          name={folderType?.icon}
          className="text-muted-foreground"
        />
        <TypographyH2 className="!p-0 capitalize">{folderId}</TypographyH2>
      </div>

      <Separator className="my-2" />

      <div className="mt-2">
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
    </div>
  );
};

export default FileContainer;
