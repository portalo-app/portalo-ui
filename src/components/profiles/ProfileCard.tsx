import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { Card, CardContent } from '@core/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@core/ui/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@core/ui/PopOver';
import { Separator } from '@core/ui/Separator';
import { TypographyH4, TypographySmall } from '@core/ui/Typography';
import { Profile } from '@models/profile';
import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  Bitcoin,
  Landmark,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import DeleteProfileModal from './DeleteProfileModal';
import ProfileForm from './ProfileForm';
interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const cryptoLabel = 'CRYPTO';
  const fiatLabel = 'FIAT';

  const { id, name, cryptoAddresses, fiatAddresses } = profile;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleDialogIsOpen = () => {
    setDialogIsOpen(!dialogIsOpen);
  };

  return (
    <>
      <Card className="m-2">
        <CardContent className="p-2 m-2">
          <div className="flex m-2 items-center justify-between">
            <div>
              <TypographyH4>{name}</TypographyH4>
            </div>
            <div className="flex gap-2 items-center">
              <Link href={`${ROUTES.APP_PROFILE}/${id}`}>
                <TypographySmall className="text-primary flex items-center">
                  <Plus size={20} />
                  Add address
                </TypographySmall>
              </Link>
              <MenuItems
                handleDelete={handleDelete}
                profile={profile}
                handleDialogIsOpen={handleDialogIsOpen}
                dialogIsOpen={dialogIsOpen}
              />
            </div>
          </div>

          <Separator />

          <div className="flex justify-around content-center mt-4">
            <div className="flex gap-2 items-center">
              <Bitcoin size={35} />
              <div className="flex flex-col gap-1">
                <TypographySmall>{cryptoAddresses.length}</TypographySmall>

                <TypographySmall>{cryptoLabel}</TypographySmall>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Landmark size={35} />

              <div className="flex flex-col gap-1">
                <TypographySmall>{fiatAddresses.length}</TypographySmall>

                <TypographySmall>{fiatLabel}</TypographySmall>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteProfileModal
        profile={profile}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
    </>
  );
};

export default ProfileCard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuItems: React.FC<any> = ({
  handleDelete,
  profile,
  handleDialogIsOpen,
  dialogIsOpen,
}) => {
  const editLabel = 'Edit';
  const deleteLabel = 'Delete';

  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical size={24} />
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
    </Popover>
  );
};
