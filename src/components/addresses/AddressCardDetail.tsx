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

}

const AddressCardDetail: React.FC<AddressCardDetailProps> = ({ addressData, handleEdit, }) => {
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

  const { name, alias, address } = addressData;

  return (
    <div className="flex flex-col p-1 items-center space-y-3">
      <QRCodeSVG
        includeMargin
        value={address}
        size={256}
        className='rounded-3xl mb-4'
      />
      <TypographyLarge>{alias}</TypographyLarge>
      <TypographyMuted>{name}</TypographyMuted>
      <div className='flex space-x-2 items-center'>
        <TypographyMuted>{address}</TypographyMuted>
        <Copy onClick={handleCopy} size={20} />
      </div>
      <Button onClick={handleShare} className='w-full text-foreground uppercase'>Share</Button>
      <Button className='bg-background text-primary w-full' onClick={handleEdit}>Edit Payment Address</Button>
    </div>
  );
}

export default AddressCardDetail