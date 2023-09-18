import AddressList from '@/components/addresses/AddressList';
import PageLayout from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants/routes.const';
import { ADDRESS_TYPE } from '@/lib/model/address';
import {
  Profile,
  ProfileContract,
  mapContractProfile,
} from '@/lib/model/profile';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, styled } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { abi } from '../../../../../contracts/build/contracts/PortaloContract.json';

interface ProfilePageProps {}

const UserPage: NextPage<ProfilePageProps> = () => {
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;
    setUserId(id as string);

    if (!id) {
      router.push(ROUTES.APP);
      return;
    }
  }, [router, router.isReady, router.query, setUserId]);

  // TODO: Implement loading state
  return (
    <PageLayout title={userId || 'Loading...'}>
      {userId && <ShowProfile userId={userId} />}
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

const ShowProfile: FC<{ userId: string }> = ({ userId }) => {
  const [addressType, setAddressType] = useState('1');
  const [profile, setProfile] = useState<Profile | null>(null);

  const { data, isError } = useContractRead({
    abi,
    address: `0x33b44669F170E5B0d10f3aE1077251A8dA3Dac43`,
    functionName: 'getProfile',
    args: [userId],
    onError: (error) => console.log('No record found'),
    select: (data) => data as ProfileContract,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAddressType(newValue);
  };

  useEffect(() => {
    if (data) setProfile(mapContractProfile(data));
  }, [data]);

  return (
    <>
      {!isError && (
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
      )}
    </>
  );
};
