'use client';

import FolderListItem from '@components/folders/FolderItem';
import ProfileHeader from '@components/profiles/ProfileHeader';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import { Separator } from '@core/ui/Separator';
import { TypographyH3 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { profilesState } from '@states/profiles.atom';
import { Folder } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface ProfilePageProps {
  params: { profileId: string };
}

const ProfilePage: NextPage<ProfilePageProps> = ({ params }) => {
  const [profile, setProfile] = useState<ProfileDTO | null>(null);
  const profilesData = useRecoilValue(profilesState);

  const { profileId } = params;
  const router = useRouter();

  useEffect(() => {
    if (!profileId) return;

    const selectedProfile = profilesData.find(
      (profile) => profile.id === profileId
    );

    if (!selectedProfile) {
      router.push(ROUTES.APP);
      return;
    }

    setProfile(selectedProfile);
  }, [profilesData, router, profileId]);

  return (
    <div>
      <div className="px-2 pr-3">
        <ProfileHeader profile={profile!} />
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
              <FolderListItem profile={profile} folder={folder} />
              {profile.folders.length - 1 !== index && <Separator />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
