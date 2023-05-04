import AddressList from '@/components/addresses/AddressList';
import PageLayout from '@/components/layout/PageLayout';
import { mockCryptoAddresses, mockFIATAddresses } from '@/lib/model/address';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import { useState } from 'react';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [addressType, setAddressType] = useState('1');

  const profileName = 'DeFi Argentina';

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAddressType(newValue);
  };

  return (
    <PageLayout title={profileName}>
      <TabContext value={addressType}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            variant="fullWidth"
            onChange={handleChange}
            aria-label="Address type tabs"
          >
            <Tab label="Crypto" value="1" />
            <Tab label="FIAT" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1" sx={{ p: 0 }}>
          <Button variant="contained" fullWidth sx={{ my: 2 }}>
            Add address
          </Button>

          <AddressList addresses={mockCryptoAddresses} />
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          <Button variant="contained" fullWidth sx={{ my: 2 }}>
            Add address
          </Button>

          <AddressList addresses={mockFIATAddresses} />
        </TabPanel>
      </TabContext>
    </PageLayout>
  );
};

export default ProfilePage;
