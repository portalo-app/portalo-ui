import { Button } from '@core/ui/Button';
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
        style={{ borderRadius: 8 }}
      />
      <p className='font-bold'>{alias}</p>
      <p>{name}</p>
      <div className='flex space-x-2'>
        <p>{address}</p>
        <Copy onClick={handleCopy} />
      </div>
      <Button onClick={handleShare} className='w-full text-foreground'>Share</Button>
      <Button className='bg-background text-primary w-full' onClick={handleEdit}>Edit Payment Address</Button>
    </div>
  );
}

export default AddressCardDetail