import FormInputText from '@/core/components/FormInputText';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

interface CreateProfileFormProps {
  onCreate: () => void;
}

type FormData = {
  name: string;
  password: string;
};

const CreateProfileForm: React.FC<CreateProfileFormProps> = ({ onCreate }) => {
  const createLabel = 'Create';
  const requiredMessage = 'Name is required';
  const maxLengthMessage = 'Name is too long';
  const nameLabel = 'Name';
  const passwordLabel = 'Password';

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });
  const [showPassword, setShowPassword] = useState(false);
  const setProfiles = useSetRecoilState(profilesState);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.focus();
  };

  const onSubmit = (data: FormData) => {
    const { name, password } = data;

    const profile: Profile = {
      id: Date.now().toString(),
      name,
      cryptoAddresses: [],
      fiatAddresses: [],
    };

    setProfiles((profiles) => [...profiles, profile]);

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
