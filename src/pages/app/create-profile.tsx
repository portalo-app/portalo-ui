import PageLayout from '@/components/layout/PageLayout';
import FormInputText from '@/core/components/FormInputText';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import profilesState from '@/lib/store/profiles.atom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

interface CreateProfileProps {}

type FormData = {
  name: string;
  password: string;
};

const CreateProfile: React.FC<CreateProfileProps> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });
  const [showPassword, setShowPassword] = useState(false);
  const setProfiles = useSetRecoilState(profilesState);
  const router = useRouter();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.focus();
  };

  const onSubmit = (data: FormData) => {
    const { name, password } = data;

    const profile: Profile = {
      name,
      cryptoAddresses: [],
      fiatAddresses: [],
    };

    setProfiles((profiles) => [...profiles, profile]);
    router.push(ROUTES.APP);
  };

  return (
    <PageLayout title="Create Profile" backPath={ROUTES.APP}>
      <Stack gap={2}>
        <FormInputText
          control={control}
          name="name"
          label="Name"
          error={errors.name}
          rules={{
            required: { value: true, message: 'Name is required' },
            maxLength: { value: 30, message: 'Name is too long' },
          }}
        />

        <FormInputText
          name="password"
          control={control}
          label="Password"
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

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </Stack>
    </PageLayout>
  );
};

export default CreateProfile;
