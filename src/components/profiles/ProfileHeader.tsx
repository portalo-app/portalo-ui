import ShareButton from '@core/components/ShareButton';
import AnimatedButton from '@core/ui/AnimatedButton';
import { TypographyH3, TypographyP } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import Avvvatars from 'avvvatars-react';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import DeleteProfileModal from './DeleteProfileModal';

interface ProfileHeaderProps {
  profile: ProfileDTO;
  isProfilePage?: boolean;
  readonly?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isProfilePage,
  readonly,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const deleteProfile = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center py-4 rounded-md">
        <div className="flex gap-3 items-center">
          {profile.icon ? (
            <Image
              src={profile.icon}
              alt={`${profile.name} logo`}
              width={48}
              height={48}
            />
          ) : (
            <Avvvatars
              value={profile?.name || ''}
              size={48}
              style="character"
            />
          )}
          <TypographyH3 className="break-words max-w-[12ch] text-wrap">
            {profile?.name}
          </TypographyH3>
        </div>
        {isProfilePage && !readonly && (
          <div className="flex gap-4">
            <ShareButton profile={profile} />

            <AnimatedButton
              className="gap-2 mr-4 md:mr-0 p-2 justify-center items-center md:border md:border-red-500 rounded-xl px-2 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 "
              variant="ghost"
              onClick={deleteProfile}
            >
              <TypographyP className="hidden lg:block">
                Delete profile
              </TypographyP>
              <Trash2 size={20} />
            </AnimatedButton>
          </div>
        )}
      </div>

      {profile && (
        <DeleteProfileModal
          open={openModal}
          profile={profile}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};

export default ProfileHeader;
