'use client';

import FolderListItem from '@components/folders/FolderItem';
import ProfileHeader from '@components/profiles/ProfileHeader';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import { TypographyH3 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { profilesState } from '@states/profiles.atom';
import { ChevronRight, Folder } from 'lucide-react';
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
      <ProfileHeader profile={profile!} />

      <div className="flex justify-between mt-4 items-center">
        <div className="flex items-center gap-2">
          <Folder />
          <TypographyH3>Your folders</TypographyH3>
        </div>

        <CreateButton disabled title="Add Folder" href="" />
      </div>

      <div className="*:block space-y-4 mt-4">
        {profile?.folders.map((folder, index) => (
          <Link
            key={index}
            href={`${ROUTES.APP_PROFILE}/${profileId}/${ROUTES.APP_FOLDER}/${folder.id}`}
          >
            <FolderListItem profile={profile} folder={folder} />

            <ChevronRight
              size={24}
              className="absolute top-[calc(50%-12px)] right-2"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
