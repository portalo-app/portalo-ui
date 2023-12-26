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
import { TypographyH3, TypographyLarge, TypographySmall } from '@core/ui/Typography';
import { Profile } from '@models/profile';
import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  Bitcoin,
  Landmark,
  MoreVertical,
  Pencil,
  Plus,
  Trash2
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
      <Card className="my-4 min-w-xl">
        <CardContent className="p-2 m-2">
          <div className="flex m-2 items-center justify-between">
            <div>
              <TypographyH3>{name}</TypographyH3>
            </div>
            <div className="flex space-x-2 items-center">
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
            <div className="flex space-x-2 items-center">
              <Bitcoin size={40} />
              <div className="flex flex-col">
                <TypographyLarge>
                  {cryptoAddresses.length}
                </TypographyLarge>

                <TypographyLarge>{cryptoLabel}</TypographyLarge>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <Landmark size={40} />

              <div>
                <TypographyLarge>{fiatAddresses.length}</TypographyLarge>

                <TypographyLarge>{fiatLabel}</TypographyLarge>
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
    <Popover >
      <PopoverTrigger>
        <MoreVertical size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-[150px] flex flex-col space-y-4">
        <Dialog open={dialogIsOpen} onOpenChange={handleDialogIsOpen}>
          <DialogTrigger
            className="flex justify-center space-x-3"
          >
            <Pencil size={24} />
            <TypographyLarge>{editLabel}</TypographyLarge>
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
          variant={'destructive'}
          className="space-x-2"
        >
          <Trash2 size={24} />
          <TypographyLarge>{deleteLabel}</TypographyLarge>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
