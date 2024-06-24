import { Button } from '@core/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@core/ui/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@core/ui/PopOver';
import { TypographySmall } from '@core/ui/Typography';
import { Profile } from '@models/profile';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteProfileModal from './DeleteProfileModal';
import ProfileForm from './ProfileForm';

interface ProfileActionsMenuProps {
  profile: Profile;
}

const ProfileActionsMenu: React.FC<ProfileActionsMenuProps> = ({ profile }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const editLabel = 'Edit';
  const deleteLabel = 'Delete';

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleDialogIsOpen = () => {
    setDialogIsOpen(!dialogIsOpen);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical size={24} aria-label="open" />
      </PopoverTrigger>

      <PopoverContent className="w-[150px] space-y-2 flex flex-col items-center">
        <Dialog open={dialogIsOpen} onOpenChange={handleDialogIsOpen}>
          <DialogTrigger className="flex justify-center items-center gap-2">
            <Pencil size={24} />

            <TypographySmall>{editLabel}</TypographySmall>
          </DialogTrigger>

          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>

              <DialogDescription>
                <ProfileForm
                  profile={profile}
                  action="EDIT"
                  onComplete={handleDialogIsOpen}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          onClick={handleDelete}
          variant="destructive"
          className="space-x-2"
        >
          <Trash2 size={24} />

          <TypographySmall>{deleteLabel}</TypographySmall>
        </Button>
      </PopoverContent>

      <DeleteProfileModal
        profile={profile}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
    </Popover>
  );
};

export default ProfileActionsMenu;
