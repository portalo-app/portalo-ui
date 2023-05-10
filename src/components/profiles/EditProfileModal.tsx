import AnimatedModal from '@/core/components/AnimatedModal';
import FormInputText from '@/core/components/FormInputText';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

interface EditModalProps {
  profile: Profile;
  open: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
};

const EditProfileModal: React.FC<EditModalProps> = ({
  profile,
  open,
  onClose,
}) => {
  const editTitle = 'Edit Profile';
  const saveLabel = 'Save';
  const nameLabel = 'Name';
  const requiredMessage = 'Name is required';
  const maxLengthMessage = 'Name is too long';

  const [profiles, setProfiles] = useRecoilState(profilesState);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });

  const onSubmit = (data: FormData) => {
    const newProfile = {
      ...profile,
      name: data.name,
    };

    const newProfiles = profiles.map((p) => {
      if (p.id === profile.id) {
        return newProfile;
      }
      return p;
    });

    setProfiles(newProfiles);
    onClose();
  };

  return (
    <AnimatedModal open={open} onClose={onClose}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          {editTitle}
        </Typography>

        <FormInputText
          control={control}
          name="name"
          label={nameLabel}
          error={errors.name}
          defaultValue={profile.name}
          rules={{
            required: { value: true, message: requiredMessage },
            maxLength: { value: 30, message: maxLengthMessage },
          }}
        />

        <Stack direction="row" justifyContent="flex-end" mt={2} gap={1}>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            variant="contained"
            color="primary"
            disabled={Object.keys(errors).length > 0}
            onClick={handleSubmit(onSubmit)}
          >
            {saveLabel}
          </Button>
        </Stack>
      </Paper>
    </AnimatedModal>
  );
};

export default EditProfileModal;
