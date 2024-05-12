import DeleteModal from '@core/components/DeleteModal';
import useDeleteSpace from '@hooks/spaces/useDeleteSpace';
import { Space } from '@models/space';

interface DeleteSpaceModalProps {
  space: Space;
  open: boolean;
  onClose: () => void;
}

const DeleteSpaceModal: React.FC<DeleteSpaceModalProps> = ({
  space,
  open,
  onClose,
}) => {
  const deleteTitle = 'Delete Space';
  const deleteMessage =
    'Are you sure you want to delete the space "${space.name}"?';

  const deleteSpace = useDeleteSpace();

  const handleDelete = () => {
    deleteSpace(space.id);

    onClose();
  };

  return (
    <DeleteModal
      title={deleteTitle}
      message={deleteMessage.replace('${space.name}', space.name)}
      open={open}
      onClose={onClose}
      onDelete={handleDelete}
    />
  );
};

export default DeleteSpaceModal;
