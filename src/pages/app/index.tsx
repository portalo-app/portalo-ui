import PageLayout from '@/components/layout/PageLayout';
import ProfileCard from '@/components/profiles/ProfileCard';
import State from '@/core/components/State';
import { Profile, mockProfiles } from '@/lib/model/profile';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { FunctionComponent } from 'react';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const emptyMessage = "You don't have any profiles yet";

  const profiles: Profile[] = mockProfiles;

  const handleCreateProfile = () => {
    // TODO: Implement
    console.log('Create profile');
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
