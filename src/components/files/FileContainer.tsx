'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyH1 } from '@core/ui/Typography';
import useFolderType from '@hooks/useFolderType';
import { FileDTO } from '@models/dto/file.dto';
import { FolderDTO } from '@models/dto/folder.dto';
import { profilesState } from '@states/profiles.atom';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
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
  const [folder, setFolder] = useState<FolderDTO>();
  const [file, setFile] = useState<FileDTO>();
  const profilesData = useRecoilValue(profilesState);
  const router = useRouter();
  const folderType = useFolderType(folder?.folderTypeId);

  useEffect(() => {
    if (!profileId) return;

    const selectedProfile = profilesData.find(
      (profile) => profile.id === profileId
    );

    const selectedFolder = selectedProfile?.folders.find(
      (folder) => folder.id === folderId
    );

    if (!selectedProfile || !selectedFolder) {
      router.push(ROUTES.APP);
      return;
    }

    if (action === 'edit' && fileId) {
      const selectedFile = selectedFolder.files.find(
        (file) => file.id === fileId
      );

      if (!selectedFile) {
        router.push(
          `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}`
        );
        return;
      }

      setFile(selectedFile);
    }

    setFolder(selectedFolder);
  }, [profilesData, profileId, folderId, router, action, fileId]);

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
