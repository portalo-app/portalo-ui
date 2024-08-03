'use client';

import FolderListItem from '@components/folders/FolderListItem';
import ProfileHeader from '@components/profiles/ProfileHeader';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import { Separator } from '@core/ui/Separator';
import { TypographyH3 } from '@core/ui/Typography';
import { profilesState } from '@states/profiles.atom';
import { Folder } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

interface ProfileProps {
  profileId: string;
}

const Profile: FC<ProfileProps> = ({ profileId }) => {
  const profilesData = useRecoilValue(profilesState);

  const router = useRouter();

  if (!profileId) return;

  const profile = profilesData.find((profile) => profile.id === profileId);

  if (!profile) {
    router.push(ROUTES.APP);
    return;
  }

  return (
    <div>
      <div className="ml-4 md:ml-0">
        <ProfileHeader profile={profile!} isProfilePage />
      </div>

      <div className="border mt-4 rounded-lg">
        <div className="flex justify-between items-center bg-muted p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Folder />
            <TypographyH3>Your folder</TypographyH3>
          </div>

          <CreateButton disabled href="" />
        </div>

        <div className="*:block space-y-2 px-4 bg-card rounded-b-lg">
          {profile?.folders.map((folder, index) => (
            <Link
              key={index}
              href={`${ROUTES.APP_PROFILE}/${profileId}/${ROUTES.APP_FOLDER}/${folder.id}`}
            >
              <FolderListItem
                profileName={profile.name}
                folderTypeId={folder.folderTypeId}
                profileId={profile.id}
              />
              {profile.folders.length - 1 !== index && <Separator />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
