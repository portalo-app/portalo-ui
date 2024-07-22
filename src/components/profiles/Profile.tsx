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
      <div className="px-2 pr-3">
        <ProfileHeader profile={profile!} isProfilePage />
      </div>

      <div className="border border-muted mt-4 rounded-lg">
        <div className="flex justify-between items-center bg-muted/80 p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Folder />
            <TypographyH3>Your folders</TypographyH3>
          </div>

          <CreateButton disabled href="" />
        </div>

        <div className="*:block space-y-2 mt-4 px-4">
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
