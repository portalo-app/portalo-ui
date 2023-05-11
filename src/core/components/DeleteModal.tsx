import { Button, Paper, Stack, Typography } from '@mui/material';
import AnimatedModal from './AnimatedModal';

interface DeleteModalProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  message,
  open,
  onClose,
  onDelete,
}) => {
  const cancelLabel = 'Cancel';
  const deleteLabel = 'Delete';

  return (
    <AnimatedModal open={open} onClose={onClose}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>

        <Typography variant="body2">{message}</Typography>

        <Stack direction="row" justifyContent="flex-end" mt={2} gap={1}>
          <Button onClick={onClose}>{cancelLabel}</Button>

          <Button variant="contained" color="error" onClick={onDelete}>
            {deleteLabel}
          </Button>
        </Stack>
      </Paper>
    </AnimatedModal>
  );
};

export default DeleteModal;
