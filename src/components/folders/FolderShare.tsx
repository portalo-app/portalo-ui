'use client';

import FileListItem from '@components/files/FileListItem';
import ProfileHeader from '@components/profiles/ProfileHeader';
import { ROUTES } from '@constants/routes.const';
import PortaloCTA from '@core/components/PortaloCTA';
import Icon from '@core/ui/Icon';
import { TypographyH3 } from '@core/ui/Typography';
import useFolderType from '@hooks/useFolderType';
import { FileDTO } from '@models/dto/file.dto';
import { sharedProfileState } from '@states/sharedProfile.atom';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

const FolderShare: FC<{ folderId: string }> = ({ folderId }) => {
  const router = useRouter();

  const profile = useRecoilValue(sharedProfileState);

  const folder = useMemo(
    () => profile?.folders.find((folder) => folder.id === folderId),
    [folderId, profile]
  );

  const { getFolderType } = useFolderType();

  if (!profile || !folder) {
    router.push(ROUTES.APP);
    return;
  }

  const folderType = getFolderType(folder.folderTypeId);

  return (
    <div className="space-y-4">
      <ProfileHeader profile={profile!} />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name={folderType.icon} className="text-muted-foreground" />
          <TypographyH3>{folderType?.label} folder</TypographyH3>
        </div>
      </div>

      <div className="space-y-4 pb-4">
        {folder?.files.length > 0 ? (
          folder?.files.map((file: FileDTO, index: number) => (
            <motion.div
              key={index}
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 0 },
              }}
              initial="closed"
              animate="open"
              transition={{ delay: index * 0.2 }}
            >
              <FileListItem
                profileId={profile.id}
                folderId={folderId}
                file={file}
                folderType={folderType}
                readonly
              />
            </motion.div>
          ))
        ) : (
          <div className="flex justify-center items-center h-36">
            <TypographyH3>No files in this folder</TypographyH3>
          </div>
        )}
      </div>

      <PortaloCTA />
    </div>
  );
};

export default FolderShare;
