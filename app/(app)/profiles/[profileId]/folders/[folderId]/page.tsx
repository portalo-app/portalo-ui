'use client';

import FileListItem from '@components/files/FileListItem';
import ProfileHeader from '@components/profiles/ProfileHeader';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { TypographyH3 } from '@core/ui/Typography';
import useFolderType from '@hooks/useFolderType';
import { FileDTO } from '@models/dto/file.dto';
import { FolderDTO } from '@models/dto/folder.dto';
import { ProfileDTO } from '@models/dto/profile.dto';
import { profilesState } from '@states/profiles.atom';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface FolderDetailsProps {
  params: { folderId: string; profileId: string };
}

const FolderDetail: NextPage<FolderDetailsProps> = ({ params }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileDTO | null>(null);
  const [folder, setFolder] = useState<FolderDTO | null>(null);
  const pathName = usePathname();

  const profilesData = useRecoilValue(profilesState);
  const { folderId, profileId } = params;

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

    setProfile(selectedProfile);
    setFolder(selectedFolder);
  }, [folderId, profileId, profilesData, router]);

  return (
    <div className="space-y-4">
      <ProfileHeader profile={profile!} />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Landmark />
          <TypographyH3>{folderType?.label} folder</TypographyH3>
        </div>

        <CreateButton href={`${pathName}/new`} />
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
