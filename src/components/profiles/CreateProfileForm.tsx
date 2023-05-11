import FormInputText from '@/core/components/FormInputText';
import useCreateProfile from '@/lib/hooks/profiles/useCreateProfile';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateProfileFormProps {
  onCreate: () => void;
}

type FormData = {
  name: string;
  password: string;
};

const CreateProfileForm: React.FC<CreateProfileFormProps> = ({ onCreate }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });
  const [showPassword, setShowPassword] = useState(false);
  const createProfile = useCreateProfile();

  const createLabel = 'Create';
  const requiredMessage = 'Name is required';
  const maxLengthMessage = 'Name is too long';
  const nameLabel = 'Name';
  const passwordLabel = 'Password';

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.focus();
  };

  const onSubmit = (data: FormData) => {
    const { name } = data;

    createProfile(name);

    onCreate && onCreate();
  };

  return (
    <Stack gap={2}>
      <FormInputText
        control={control}
        name="name"
        label={nameLabel}
        error={errors.name}
        rules={{
          required: { value: true, message: requiredMessage },
          maxLength: { value: 30, message: maxLengthMessage },
        }}
      />

      <FormInputText
        name="password"
        control={control}
        label={passwordLabel}
        type={showPassword ? 'text' : 'password'}
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
        {createLabel}
      </Button>
    </Stack>
  );
};

export default CreateProfileForm;
