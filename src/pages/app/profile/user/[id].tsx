import AddressList from '@/components/addresses/AddressList';
import PageLayout from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants/routes.const';
import { ADDRESS_TYPE } from '@/lib/model/address';
import { Profile, mockProfileJohn } from '@/lib/model/profile';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, styled } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProfilePageProps {}

const UserPage: NextPage<ProfilePageProps> = () => {
  const [addressType, setAddressType] = useState('1');
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;
    console.log(id);

    if (!id) {
      router.push(ROUTES.APP);
      return;
    }

    setProfile(mockProfileJohn);
  }, [router, router.isReady, router.query]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAddressType(newValue);
  };

  // TODO: Implement loading state
  return (
    <PageLayout title={profile?.name || 'Loading...'} backPath={ROUTES.APP}>
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
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          <AddressList
            profileId={profile?.id || ''}
            addresses={profile?.fiatAddresses || []}
            addressType={ADDRESS_TYPE.FIAT}
          />
        </TabPanel>
      </TabContext>
    </PageLayout>
  );
};

export default UserPage;

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
