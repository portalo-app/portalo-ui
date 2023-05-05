import { CryptoAddress, FIATAddress } from '@/lib/model/address';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

interface AddressCardProps extends CardProps {
  addressData: CryptoAddress | FIATAddress;
}

const AddressCard: React.FC<AddressCardProps> = ({ addressData, ...props }) => {
  const { color, icon, name, alias, notes, entity, address } = addressData;

  return (
    <Card sx={{ borderLeft: `4px solid ${color}` }} {...props}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <Avatar sx={{ width: 24, height: 24 }} />

            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="subtitle2">{entity}</Typography>

              {alias && <Chip size="small" label={alias} />}
            </Stack>
          </Stack>

          <Typography variant="h6">{name || 'Wallet'}</Typography>

          <Typography variant="caption" fontSize={12}>
            {address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddressCard;
