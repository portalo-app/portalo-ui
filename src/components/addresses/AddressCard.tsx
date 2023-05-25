import { CryptoAddress, FIATAddress } from '@/lib/model/address';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Chip,
  Grow,
  Stack,
  Typography,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import EntityIcon from '../entities/EntityIcon';

interface AddressCardProps extends CardProps {
  addressData: CryptoAddress | FIATAddress;
  showQR?: boolean;
  inModal?: boolean;
}

const AddressCard: React.FC<AddressCardProps> = ({
  addressData,
  showQR,
  inModal,
  ...props
}) => {
  const { name, alias, notes, entity, address } = addressData;

  return (
    <Card
      sx={{
        [inModal ? 'borderTop' : 'borderLeft']: `3px solid ${entity.color}`,
      }}
      {...props}
      elevation={inModal ? 0 : 2}
      variant={inModal ? 'outlined' : 'elevation'}
    >
      <CardActionArea disabled={inModal}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <Avatar sx={{ width: 24, height: 24 }}>
              <EntityIcon entity={entity.value} />
            </Avatar>

            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="subtitle2">{entity.label}</Typography>

              {alias && <Chip size="small" label={alias} />}
            </Stack>
          </Stack>

          <Typography variant="h6">{name || 'Wallet'}</Typography>

          <Typography variant="mono" fontSize={12}>
            {address}
          </Typography>

          <Grow in={showQR} mountOnEnter unmountOnExit>
            <Stack mt={2} alignItems="center">
              <QRCodeSVG
                includeMargin
                value={address}
                size={256}
                style={{ borderRadius: 8 }}
              />
            </Stack>
          </Grow>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddressCard;
