import EntityIcon from '@components/entities/EntityIcon';
import { Button } from '@core/ui/Button';
import { TypographyLarge, TypographyMuted } from '@core/ui/Typography';
import { CryptoAddress, FIATAddress } from '@models/address';
import { Copy } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { QRCodeSVG } from 'qrcode.react';

interface AddressCardDetailProps {
  addressData: CryptoAddress | FIATAddress;
  handleEdit: () => void;
  handleDelete: () => void;
  editable?: boolean;
}

const AddressCardDetail: React.FC<AddressCardDetailProps> = ({
  addressData,
  handleEdit,
  editable = true,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleShare = () => {
    // Share selectedAddress.address via navigator.share
    navigator?.share({
      text: address || '',
    });
  };

  const copiedMessage = 'Address copied!';

  const handleCopy = () => {
    // Copy selectedAddress.address to clipboard
    navigator?.clipboard?.writeText(address || '').then(() => {
      enqueueSnackbar(copiedMessage, {
        variant: 'success',
      });
    });
  };

  const { alias, address, entity } = addressData;

  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <QRCodeSVG
          includeMargin
          value={address}
          size={256}
          className="rounded-3xl mb-4"
        />
      </div>
      <TypographyLarge>{alias}</TypographyLarge>
      <div className="flex items-center gap-2 justify-center">
        <EntityIcon width={50} height={50} entity={entity.value} />
        <TypographyMuted>{entity.label}</TypographyMuted>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <TypographyMuted>{address}</TypographyMuted>
        <Copy onClick={handleCopy} size={20} />
      </div>
      <Button onClick={handleShare} className="uppercase">
        Share
      </Button>
      {editable && (
        <Button variant="secondary" onClick={handleEdit}>
          Edit Payment Address
        </Button>
      )}
    </div>
  );
};

export default AddressCardDetail;
