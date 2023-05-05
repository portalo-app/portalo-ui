import { NextLinkComposed } from '@/core/components/Link';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const margin = 2;
  const { name, cryptoAddresses, fiatAddresses } = profile;

  return (
    <Card
      variant="outlined"
      component={NextLinkComposed}
      to={{
        pathname: ROUTES.APP_PROFILE,
      }}
    >
      <CardActionArea>
        <CardContent>
          <Stack direction="row" mb={margin} alignItems="center" gap={margin}>
            <Avatar sx={{ width: 24, height: 24 }} />

            <Typography fontWeight="bold">{name}</Typography>
          </Stack>

          <Divider sx={{ mx: -margin }} />

          <Stack direction="row" gap={4} mt={margin}>
            <Stack flex="1" alignItems="center">
              <Typography variant="body2">
                {cryptoAddresses.length} CRYPTO
              </Typography>
            </Stack>

            <Divider orientation="vertical" flexItem sx={{ my: -margin }} />

            <Stack flex="1" alignItems="center">
              <Typography variant="body2">
                {fiatAddresses.length} FIAT
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
