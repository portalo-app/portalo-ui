import PageLayout from '@/components/layout/PageLayout';
import ProfileCard from '@/components/profiles/ProfileCard';
import ProfileForm from '@/components/profiles/ProfileForm';
import DraggableDrawer from '@/core/components/DraggableDrawer';
import State from '@/core/components/State';
import { ROUTES } from '@/lib/constants/routes.const';
import useIsMobile from '@/lib/hooks/common/useIsMobile';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
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
  const [openCreateProfile, setOpenCreateProfile] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    setProfiles(profilesData);
  }, [profilesData]);

  const handleCreateProfile = () => {
    if (isMobile) {
      setOpenCreateProfile(true);
    } else {
      router.push(ROUTES.APP_CREATE_PROFILE);
    }
  };

  return (
    <PageLayout
      title={profilesTitle}
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

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleCreateProfile}
        sx={{ mt: 2 }}
      >
        {createProfileTitle}
      </Button>

      <DraggableDrawer
        open={openCreateProfile}
        onClose={() => setOpenCreateProfile(false)}
        onOpen={() => setOpenCreateProfile(true)}
      >
        <PageLayout title={createProfileTitle}>
          <ProfileForm
            action="CREATE"
            onComplete={() => setOpenCreateProfile(false)}
          />
        </PageLayout>
      </DraggableDrawer>
    </PageLayout>
  );
};

export default AppPage;
