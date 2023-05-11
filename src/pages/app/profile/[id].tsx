import AddressList from '@/components/addresses/AddressList';
import CreateAddressForm from '@/components/addresses/CreateAddressForm';
import PageLayout from '@/components/layout/PageLayout';
import DraggableDrawer from '@/core/components/DraggableDrawer';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import AddIcon from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Tab, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const profilesData = useRecoilValue(profilesState);
  const [addressType, setAddressType] = useState('1');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [openCreateAddress, setOpenCreateAddress] = useState(false);
  const router = useRouter();
  const createAddressTitle = 'Create Address';

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;
    if (!id) return;

    const profile = profilesData.find((profile) => profile.id === id);

    if (!profile) {
      router.push('/404');
      return;
    }

    setSelectedProfile(profile);
  }, [profilesData, router, router.isReady, router.query]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAddressType(newValue);
  };

  const handleCreateAddress = () => {
    setOpenCreateAddress(true);
  };

  // TODO: Implement loading state
  return (
    <PageLayout
      title={selectedProfile?.name || 'Loading...'}
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
            label={`CRYPTO (${selectedProfile?.cryptoAddresses?.length || 0})`}
          />
          <Tab
            value="2"
            label={`FIAT (${selectedProfile?.fiatAddresses?.length || 0})`}
          />
        </StyledTabs>

        <TabPanel value="1" sx={{ p: 0 }}>
          <AddressList
            profileId={selectedProfile?.id || ''}
            addresses={selectedProfile?.cryptoAddresses || []}
            addressType="CRYPTO"
          />

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleCreateAddress}
            sx={{ mt: 2 }}
          >
            {createAddressTitle}
          </Button>
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          <AddressList
            profileId={selectedProfile?.id || ''}
            addresses={selectedProfile?.fiatAddresses || []}
            addressType="FIAT"
          />

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleCreateAddress}
            sx={{ mt: 2 }}
          >
            {createAddressTitle}
          </Button>
        </TabPanel>
      </TabContext>

      <DraggableDrawer
        open={openCreateAddress}
        onClose={() => setOpenCreateAddress(false)}
        onOpen={() => setOpenCreateAddress(true)}
      >
        <PageLayout title={createAddressTitle}>
          <CreateAddressForm
            profileId={selectedProfile?.id || ''}
            addressType={addressType === '1' ? 'CRYPTO' : 'FIAT'}
            onCreate={() => setOpenCreateAddress(false)}
          />
        </PageLayout>
      </DraggableDrawer>
    </PageLayout>
  );
};

export default ProfilePage;

const StyledTabs = styled(TabList)`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: 1rem;

  .MuiTabs-indicator {
    height: 100%;
    background-color: ${({ theme }) => theme.palette.grey[900]};
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
