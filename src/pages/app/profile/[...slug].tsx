import AddressList from '@/components/addresses/AddressList';
import PageLayout from '@/components/layout/PageLayout';
import PulseButton from '@/core/components/PulseButton';
import { ROUTES } from '@/lib/constants/routes.const';
import { ADDRESS_TYPE } from '@/lib/model/address';
import { Profile } from '@/lib/model/profile';
import { addressFormState } from '@/lib/store/address-form.atom';
import { profilesState } from '@/lib/store/profiles.atom';
import AddIcon from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, styled } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = () => {
  const profilesData = useRecoilValue(profilesState);
  const setAddressForm = useSetRecoilState(addressFormState);
  const [addressType, setAddressType] = useState('1');
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const createAddressTitle = 'Create Address';

  useEffect(() => {
    if (!router.isReady) return;

    const { slug } = router.query;

    const id = slug && slug[0];
    const type: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

    if (type) setAddressType(type === ADDRESS_TYPE.FIAT ? '2' : '1');

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
    const type = addressType === '1' ? ADDRESS_TYPE.CRYPTO : ADDRESS_TYPE.FIAT;

    setAddressForm((currentValue) => ({ ...currentValue, action: 'CREATE' }));
    router.push(`${ROUTES.APP_SELECT_ENTITY}/${profile?.id}/${type}`);
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
            label={`${ADDRESS_TYPE.CRYPTO} (${
              profile?.cryptoAddresses?.length || 0
            })`}
          />
          <Tab
            value="2"
            label={`${ADDRESS_TYPE.FIAT} (${
              profile?.fiatAddresses?.length || 0
            })`}
          />
        </StyledTabs>

        <TabPanel value="1" sx={{ p: 0 }}>
          <AddressList
            profileId={profile?.id || ''}
            addresses={profile?.cryptoAddresses || []}
            addressType={ADDRESS_TYPE.CRYPTO}
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
            addressType={ADDRESS_TYPE.FIAT}
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
