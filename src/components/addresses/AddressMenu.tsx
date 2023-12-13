import { Button } from '@core/ui/Button';
import { Address } from '@models/address';
import { Check, Copy, Pencil, QrCode, Share, Trash2 } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

interface AddressMenuProps {
  selectedAddress: Address;
  handleQR: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
}

const AddressMenu: React.FC<AddressMenuProps> = ({
  selectedAddress,
  handleQR,
  handleDelete,
  handleEdit,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const copiedMessage = 'Address copied!';

  const handleCopy = () => {
    // Copy selectedAddress.address to clipboard
    navigator?.clipboard?.writeText(selectedAddress?.address || '').then(() => {
      enqueueSnackbar(copiedMessage, {
        variant: 'success',
        onClose: () => setSnackbarOpen(false),
        onEnter: () => setSnackbarOpen(true),
        onExited: () => setSnackbarOpen(false),
      });
    });
  };

  const handleShare = () => {
    // Share selectedAddress.address via navigator.share
    navigator?.share({
      text: selectedAddress?.address || '',
    });
  };

  const items = [
    {
      icon: snackbarOpen ? <Check /> : <Copy />,
      label: 'Copy',
      action: handleCopy,
      color: 'default' as const,
      disabled: snackbarOpen,
    },
    {
      icon: <QrCode />,
      label: 'QR Code',
      action: handleQR,
      color: 'default' as const,
    },
    {
      icon: <Share />,
      label: 'Share',
      action: handleShare,
      color: 'default' as const,
    },
    {
      icon: <Pencil />,
      label: 'Edit',
      action: handleEdit,
      color: 'default' as const,
    },
    {
      icon: <Trash2 />,
      label: 'Delete',
      action: handleDelete,
      color: 'error' as const,
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        {items.map(({ icon, action, disabled }, index) => (
          <Button
            key={index}
            onClick={action}
            disabled={disabled}
            variant="link"
            className="rounded-full m-1 border-primary border hover:shadow hover:shadow-primary"
          >
            {icon}
          </Button>
        ))}
      </div>
    </>
  );
};

export default AddressMenu;
