import { Button } from '@core/ui/Button';
import { TypographyH3 } from '@core/ui/Typography';
import { Profile } from '@models/profile';
import Avvvatars from 'avvvatars-react';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import DeleteProfileModal from './DeleteProfileModal';

interface ProfileHeaderProps {
  profile: Profile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const deleteProfile = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-muted p-4 rounded-md">
        <div className="flex gap-2 items-center">
          <Avvvatars value={profile?.name || ''} size={42} style="character" />
          <TypographyH3>{profile?.name}</TypographyH3>
        </div>

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
