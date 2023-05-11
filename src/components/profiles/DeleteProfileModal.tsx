import DeleteModal from '@/core/components/DeleteModal';
import useDeleteProfile from '@/lib/hooks/profiles/useDeleteProfile';
import { Profile } from '@/lib/model/profile';

interface DeleteModalProps {
  profile: Profile;
  open: boolean;
  onClose: () => void;
}

const DeleteProfileModal: React.FC<DeleteModalProps> = ({
  profile,
  open,
  onClose,
}) => {
  const deleteTitle = 'Delete Profile';
  const deleteMessage =
    'Are you sure you want to delete the profile "${profile.name}"?';

  const deleteProfile = useDeleteProfile();

  const handleDelete = () => {
    deleteProfile(profile.id);

    onClose();
  };

  return (
    <DeleteModal
      title={deleteTitle}
      message={deleteMessage.replace('${profile.name}', profile.name)}
      open={open}
      onClose={onClose}
      onDelete={handleDelete}
    />
  );
};

export default DeleteProfileModal;
