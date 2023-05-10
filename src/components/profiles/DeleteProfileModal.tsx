import AnimatedModal from '@/core/components/AnimatedModal';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';

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
  const cancelLabel = 'Cancel';

  const [profiles, setProfiles] = useRecoilState(profilesState);

  const handleDelete = () => {
    setProfiles(profiles.filter((p) => p.id !== profile.id));
    onClose();
  };

  return (
    <AnimatedModal open={open} onClose={onClose}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          {deleteTitle}
        </Typography>

        <Typography variant="body2">
          {deleteMessage.replace('${profile.name}', profile.name)}
        </Typography>

        <Stack direction="row" justifyContent="flex-end" mt={2} gap={1}>
          <Button onClick={onClose}>{cancelLabel}</Button>

          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Paper>
    </AnimatedModal>
  );
};

export default DeleteProfileModal;
