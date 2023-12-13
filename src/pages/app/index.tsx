import PageLayout from '@components/layout/PageLayout';
import ProfileCard from '@components/profiles/ProfileCard';
import { ROUTES } from '@constants/routes.const';
import PulseButton from '@core/components/PulseButton';
import State from '@core/components/State';
import { Profile } from '@models/profile';
import AddIcon from '@mui/icons-material/Add';
import { Fade, Stack } from '@mui/material';
import { profilesState } from '@states/profiles.atom';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const profilesTitle = 'Profiles';
  const emptyMessage = "You don't have any profiles yet";
  const createProfileTitle = 'Create Profile';
  const profilesData = useRecoilValue(profilesState);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProfiles(profilesData);
  }, [profilesData]);

  const hasProfiles = profiles && profiles.length > 0;

  const handleCreateProfile = () => {
    router.push(ROUTES.APP_CREATE_PROFILE);
  };

  return (
    <PageLayout
      title={profilesTitle}
      action={{
        icon: <AddIcon />,
        onClick: handleCreateProfile,
      }}
    >
      {!hasProfiles && <State type="info" label={emptyMessage} />}

      {hasProfiles && (
        <Stack gap={2}>
          {profiles.map((profile, index) => (
            <Fade key={index} in timeout={{ enter: 200 * (index + 1) }}>
              <div>
                <ProfileCard profile={profile} />
              </div>
            </Fade>
          ))}
        </Stack>
      )}

      <PulseButton
        variant="outlined"
        pulse={!hasProfiles}
        startIcon={<AddIcon />}
        onClick={handleCreateProfile}
        sx={{ mt: 2 }}
      >
        {createProfileTitle}
      </PulseButton>
    </PageLayout>
  );
};

export default AppPage;
