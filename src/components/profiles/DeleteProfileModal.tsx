import DeleteModal from '@core/components/DeleteModal';
import useProfile from '@hooks/profiles/useProfile';
import { ProfileDTO } from '@models/dto/profile.dto';

interface DeleteProfileModalProps {
  profile: ProfileDTO;
  open: boolean;
  onClose: () => void;
}

const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
  profile,
  open,
  onClose,
}) => {
  const { deleteProfile } = useProfile();

  const deleteTitle = 'Delete Profile';
  const deleteMessage =
    'Are you sure you want to delete the profile "${profile.name}"?';

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
