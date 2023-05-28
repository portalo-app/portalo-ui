import AddressList from '@/components/addresses/AddressList';
import PageLayout from '@/components/layout/PageLayout';
import PulseButton from '@/core/components/PulseButton';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import AddIcon from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, styled } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = () => {
  const profilesData = useRecoilValue(profilesState);
  const [addressType, setAddressType] = useState('1');
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const createAddressTitle = 'Create Address';

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;
    if (!id) return;

    const selectedProfile = profilesData.find((profile) => profile.id === id);

    if (!selectedProfile) {
      router.push(ROUTES.APP);
      return;
    }

    setProfile(selectedProfile);
  }, [profilesData, router, router.isReady, router.query]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAddressType(newValue);
  };

  const handleCreateAddress = () => {
    const type = addressType === '1' ? 'CRYPTO' : 'FIAT';

    router.push(`${ROUTES.APP_CREATE_ADDRESS}/${profile?.id}/${type}`);
  };

  // TODO: Implement loading state
  return (
    <PageLayout
      title={profile?.name || 'Loading...'}
      backPath={ROUTES.APP}
      action={{
        icon: <AddIcon />,
        onClick: handleCreateAddress,
      }}
    >
      <TabContext value={addressType}>
        <StyledTabs
          variant="fullWidth"
          onChange={handleChange}
          aria-label="Address type tabs"
        >
          <Tab
            value="1"
            label={`CRYPTO (${profile?.cryptoAddresses?.length || 0})`}
          />
          <Tab
            value="2"
            label={`FIAT (${profile?.fiatAddresses?.length || 0})`}
          />
        </StyledTabs>

        <TabPanel value="1" sx={{ p: 0 }}>
          <AddressList
            profileId={profile?.id || ''}
            addresses={profile?.cryptoAddresses || []}
            addressType="CRYPTO"
          />

          <PulseButton
            variant="outlined"
            pulse={(profile?.cryptoAddresses || []).length === 0}
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleCreateAddress}
            sx={{ mt: 2 }}
          >
            {createAddressTitle}
          </PulseButton>
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          <AddressList
            profileId={profile?.id || ''}
            addresses={profile?.fiatAddresses || []}
            addressType="FIAT"
          />

          <PulseButton
            variant="outlined"
            pulse={(profile?.fiatAddresses || []).length === 0}
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleCreateAddress}
            sx={{ mt: 2 }}
          >
            {createAddressTitle}
          </PulseButton>
        </TabPanel>
      </TabContext>
    </PageLayout>
  );
};

export default ProfilePage;

const StyledTabs = styled(TabList)`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.divider};

  .MuiTabs-indicator {
    height: 100%;
    background-color: ${({ theme }) => theme.palette.background.paper};
    filter: brightness(0.8);
    z-index: 1;
  }

  .MuiTab-root {
    background-color: transparent;
    z-index: 2;

    &.Mui-selected {
      font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    }
  }
`;
