'use client';

import FileItem from '@components/files/FileItem';
import FolderTitle from '@components/folders/FolderTitle';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { Folder } from '@models/business/folder';
import { Profile } from '@models/business/profile';
import { profilesState } from '@states/profiles.atom';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface FolderDetailsProps {
  params: { folderId: string; profileId: string };
}

const FolderDetail: NextPage<FolderDetailsProps> = ({ params }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [folder, setFolder] = useState<Folder | null>(null);
  const pathName = usePathname();

  const profilesData = useRecoilValue(profilesState);
  const { folderId, profileId } = params;

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
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FolderTitle profile={profile!} folder={folder!} />

        <CreateButton href={`${pathName}/new`} />
      </div>

      {/* <div>VARIANT FILTER</div> */}

      <div className="space-y-4">
        {folder?.files?.length ?? 0 > 0 ? (
          folder?.files.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              profileId={profileId}
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
