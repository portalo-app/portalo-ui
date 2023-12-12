import { Button } from '@/core/ui/Button';
import { Card, CardContent } from '@/core/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/core/ui/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/core/ui/PopOver';
import { Separator } from '@/core/ui/Separator';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  CircleDollarSign,
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

  const handleCloseDialog = () => {
    setDialogIsOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogIsOpen(true);
  };

  return (
    <>
      <Card className="my-4 min-w-xl">
        <CardContent className="p-2 m-2">
          <div className="flex m-2 content-center justify-between">
            <div className="flex content-center ">
              <h6 className="flex font-bold text-xl ">{name}</h6>
            </div>
            <div className="flex space-x-2">
              <Link href={`${ROUTES.APP_PROFILE}/${id}`}>
                <p className="text-primary flex rounded-2xl">
                  <Plus />
                  Add address
                </p>
              </Link>
              <MenuItems
                handleDelete={handleDelete}
                profile={profile}
                className="z-30"
                handleCloseDialog={handleCloseDialog}
                setDialogIsOpen={setDialogIsOpen}
                dialogIsOpen={dialogIsOpen}
              />
            </div>
          </div>

          <Separator />

          <div className="flex justify-around content-center mt-4">
            <div className="flex space-x-4 m-2 items-center">
              <CircleDollarSign size={32} />
              <div className="flex flex-col">
                <h1 className="font-bold font-mono">
                  {cryptoAddresses.length}
                </h1>

                <h1>{cryptoLabel}</h1>
              </div>
            </div>

            <div className="flex space-x-4 m-2 items-center">
              <Landmark size={32} />

              <div>
                <h1 className="font-mono font-bold">{fiatAddresses.length}</h1>

                <h1>{fiatLabel}</h1>
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

const MenuItems: React.FC<any> = ({
  handleDelete,
  profile,
  handleCloseDialog,
  setDialogIsOpen,
  dialogIsOpen,
}) => {
  const editLabel = 'Edit';
  const deleteLabel = 'Delete';

  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-[150px] flex flex-col space-y-4">
        <Dialog open={dialogIsOpen}>
          <DialogTrigger
            onClick={setDialogIsOpen}
            className="flex justify-center space-x-3"
          >
            <Pencil size={24} />
            <h2>{editLabel}</h2>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                <ProfileForm
                  profile={profile}
                  action="EDIT"
                  onComplete={handleCloseDialog}
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
          <h2>{deleteLabel}</h2>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
