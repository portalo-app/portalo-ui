'use client';

import FolderListItem from '@components/folders/FolderItem';
import DeleteProfileModal from '@components/profiles/DeleteProfileModal';
import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyH3 } from '@core/ui/Typography';
import { Profile } from '@models/business/profile';
import { profilesState } from '@states/profiles.atom';
import { ChevronRight, Trash } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface ProfilePageProps {
  params: { profileId: string };
}

const ProfilePage: NextPage<ProfilePageProps> = ({ params }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const profilesData = useRecoilValue(profilesState);
  const [openModal, setOpenModal] = useState<boolean>(false);
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

  const deleteProfile = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <TypographyH3>{profile?.name}</TypographyH3>
        <Button
          size="sm"
          className="gap-1 bg-transparent text-destructive brightness-150 hover:bg-transparent hover:brightness-200 hover:text-destructive"
          variant="ghost"
          onClick={deleteProfile}
        >
          <Trash size={16} />
          Delete
        </Button>
      </div>

      <div className="divide-y-2 *:block">
        {profile?.folders.map((folder, index) => (
          <Link
            className="relative"
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
      {profile && (
        <DeleteProfileModal
          open={openModal}
          profile={profile}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default ProfilePage;
