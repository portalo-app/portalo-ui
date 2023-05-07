import PageLayout from '@/components/layout/PageLayout';
import ProfileCard from '@/components/profiles/ProfileCard';
import State from '@/core/components/State';
import { ROUTES } from '@/lib/constants/routes.const';
import profilesState from '@/lib/store/profiles.atom';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const emptyMessage = "You don't have any profiles yet";
  const profiles = useRecoilValue(profilesState);
  const router = useRouter();

  const handleCreateProfile = () => {
    router.push(ROUTES.APP_CREATE_PROFILE);
  };

  return (
    <PageLayout
      title="Profiles"
      action={{
        icon: <AddIcon />,
        onClick: handleCreateProfile,
      }}
    >
      {profiles.length === 0 && <State type="info" label={emptyMessage} />}

      {profiles.length > 0 && (
        <Stack gap={2}>
          {profiles.map((profile, index) => (
            <ProfileCard profile={profile} key={index} />
          ))}
        </Stack>
      )}
    </PageLayout>
  );
};

export default AppPage;
