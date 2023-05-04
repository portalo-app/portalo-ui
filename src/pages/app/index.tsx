import PageLayout from '@/components/layout/PageLayout';
import { NextLinkComposed } from '@/core/components/Link';
import State from '@/core/components/State';
import { ROUTES } from '@/lib/constants/routes.const';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const margin = 2;
  const emptyMessage = "You don't have any profiles yet";

  const profiles = [
    {
      name: 'NeoPower Digital, LLC',
      crypto: 5,
      fiat: 5,
    },
    {
      name: 'DeFi Argentina',
      crypto: 20,
      fiat: 0,
    },
  ];

  const handleCreateProfile = () => {
    console.log('Create profile');
  };

  return (
    <PageLayout
      title="Profiles"
      action={{
        label: 'Create',
        icon: <AddIcon />,
        onClick: handleCreateProfile,
      }}
    >
      {profiles.length === 0 && <State type="info" label={emptyMessage} />}

      {profiles.length > 0 && (
        <Stack gap={margin}>
          {profiles.map(({ name, crypto, fiat }, index) => (
            <Card
              variant="outlined"
              key={index}
              component={NextLinkComposed}
              to={{
                pathname: ROUTES.APP_PROFILE,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack
                    direction="row"
                    mb={margin}
                    alignItems="center"
                    gap={margin}
                  >
                    <Avatar />

                    <Typography variant="h5" fontWeight="bold">
                      {name}
                    </Typography>
                  </Stack>

                  <Divider sx={{ mx: -margin }} />

                  <Stack direction="row" gap={4} mt={margin}>
                    <Stack flex="1" alignItems="center">
                      <Typography>{crypto} Crypto</Typography>
                    </Stack>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ my: -margin }}
                    />

                    <Stack flex="1" alignItems="center">
                      <Typography>{fiat} Fiat</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </PageLayout>
  );
};

export default AppPage;
