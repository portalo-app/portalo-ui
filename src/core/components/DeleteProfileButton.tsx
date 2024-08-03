import DeleteProfileModal from '@components/profiles/DeleteProfileModal';
import AnimatedButton from '@core/ui/AnimatedButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { ProfileDTO } from '@models/dto/profile.dto';
import { Trash2 } from 'lucide-react';
import { FC, useState } from 'react';

interface DeleteProfileButtonProps {
  profile: ProfileDTO;
}

const DeleteProfileButton: FC<DeleteProfileButtonProps> = ({ profile }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const deleteProfile = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <AnimatedButton
              className="gap-2 w-full justify-center items-center transition duration-300"
              variant="outline"
              onClick={deleteProfile}
            >
              <Trash2 size={20} />
            </AnimatedButton>
          </TooltipTrigger>
          <TooltipContent className="text-wrap max-w-[100ch]">
            Delete Profile
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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

export default DeleteProfileButton;
