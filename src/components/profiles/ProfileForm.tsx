import FormInputText from '@/core/components/FormInputText';
import useCreateProfile from '@/lib/hooks/profiles/useCreateProfile';
import useEditProfile from '@/lib/hooks/profiles/useEditProfile';
import { Profile } from '@/lib/model/profile';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormProps {
  action: 'CREATE' | 'EDIT';
  onComplete: () => void;
  profile?: Profile;
}

type FormData = {
  name: string;
  password: string;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  action,
  profile,
  onComplete,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });
  const [showPassword, setShowPassword] = useState(false);
  const createProfile = useCreateProfile();
  const editProfile = useEditProfile();

  const actionLabel = action === 'CREATE' ? 'Create' : 'Edit';
  const nameLabel = 'Name';
  const nameRequiredMessage = 'Name is required';
  const nameMaxLengthMessage = 'Name is too long';

  const passwordLabel = 'Password';

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.focus();
  };

  const onSubmit = (data: FormData) => {
    const { name, password } = data;

    // TODO: Add password as param
    if (action === 'CREATE') {
      createProfile(name, password);
    } else {
      if (!profile?.id) return;

      editProfile(profile?.id || '', name, password);
    }

    onComplete && onComplete();
  };

  return (
    <Stack gap={2}>
      <FormInputText
        control={control}
        name="name"
        label={nameLabel}
        error={errors.name}
        defaultValue={action === 'EDIT' ? profile?.name : ''}
        rules={{
          required: { value: true, message: nameRequiredMessage },
          maxLength: { value: 30, message: nameMaxLengthMessage },
        }}
      />

      <FormInputText
        name="password"
        control={control}
        label={passwordLabel}
        type={showPassword ? 'text' : 'password'}
        defaultValue={action === 'EDIT' ? profile?.password : undefined}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={handleMouseDownPassword}
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <Button
        variant="contained"
        disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(onSubmit)}
      >
        {actionLabel}
      </Button>
    </Stack>
  );
};

export default ProfileForm;
