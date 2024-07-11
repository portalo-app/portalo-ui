'use client';

import FileListItem from '@components/files/FileListItem';
import ProfileHeader from '@components/profiles/ProfileHeader';
import { FILES_PER_FOLDER_LIMIT } from '@constants/constants.const';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import Icon from '@core/ui/Icon';
import { TypographyH3 } from '@core/ui/Typography';
import useFolderType from '@hooks/useFolderType';
import { FileDTO } from '@models/dto/file.dto';
import { profilesState } from '@states/profiles.atom';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

interface FolderDetailsProps {
  params: { folderId: string; profileId: string };
}

const FolderDetail: NextPage<FolderDetailsProps> = ({ params }) => {
  const router = useRouter();
  const pathName = usePathname();

  const profilesData = useRecoilValue(profilesState);
  const { folderId, profileId } = params;

  const profile = useMemo(
    () => profilesData.find((profile) => profile.id === profileId),
    [profileId, profilesData]
  );

  const folder = useMemo(
    () => profile?.folders.find((folder) => folder.id === folderId),
    [folderId, profile]
  );

  const folderType = useFolderType(folder?.folderTypeId);

  if (!profileId || !profile || !folder || !folderType) {
    router.push(ROUTES.APP);
    return;
  }

  return (
    <div className="space-y-4">
      <ProfileHeader profile={profile!} />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name={folderType.icon} className="text-muted-foreground" />
          <TypographyH3>{folderType?.label} folder</TypographyH3>
        </div>

        <CreateButton
          href={`${pathName}/new`}
          disabled={folder.files.length >= FILES_PER_FOLDER_LIMIT}
          disabledTooltip={`You have reached the free limit of ${FILES_PER_FOLDER_LIMIT} files in this folder`}
        />
      </div>

      <div className="space-y-4">
        {folder?.files?.length ?? 0 > 0 ? (
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
                profileId={profileId}
                folderId={folderId}
                file={file}
                folderType={folderType}
              />
            </motion.div>
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
