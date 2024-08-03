import CloudSyncProfileButton from '@core/components/CloudSyncProfileButton';
import DeleteProfileButton from '@core/components/DeleteProfileButton';
import ShareButton from '@core/components/ShareProfileButton';
import { TypographyH3 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import Avvvatars from 'avvvatars-react';

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
  return (
    <>
      <div className="py-4 rounded-md">
        <div className="flex gap-3 items-center">
          <Avvvatars value={profile?.name || ''} size={42} style="character" />
          <TypographyH3>{profile?.name}</TypographyH3>
        </div>
        {isProfilePage && !readonly && (
          <div className="flex gap-2 mt-4">
            <CloudSyncProfileButton />

            <ShareButton profile={profile} />

            <DeleteProfileButton profile={profile} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
