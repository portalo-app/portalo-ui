import AddressList from '@/components/addresses/AddressList';
import PageLayout from '@/components/layout/PageLayout';
import { mockCryptoAddresses, mockFIATAddresses } from '@/lib/model/address';
import AddIcon from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, styled } from '@mui/material';
import { useState } from 'react';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [addressType, setAddressType] = useState('1');

  const profileName = 'John Doe';

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAddressType(newValue);
  };

  const handleCreateAddress = () => {
    // TODO: Implement
    console.log('Create address');
  };

  return (
    <PageLayout
      title={profileName}
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
          <Tab label="Crypto" value="1" />
          <Tab label="FIAT" value="2" />
        </StyledTabs>

        <TabPanel value="1" sx={{ p: 0 }}>
          <AddressList addresses={mockCryptoAddresses} />
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          <AddressList addresses={mockFIATAddresses} />
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
