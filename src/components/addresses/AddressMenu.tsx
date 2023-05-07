import { Address } from '@/lib/model/address';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShareIcon from '@mui/icons-material/Share';
import { Fab, Stack, styled } from '@mui/material';

interface AddressMenuProps {
  selectedAddress: Address;
  handleQR: () => void;
}

const AddressMenu: React.FC<AddressMenuProps> = ({
  selectedAddress,
  handleQR,
}) => {
  const handleCopy = () => {
    // Copy selectedAddress.address to clipboard
    navigator?.clipboard?.writeText(selectedAddress?.address || '');
  };

  const handleShare = () => {
    // Share selectedAddress.address via navigator.share
    navigator?.share({
      text: selectedAddress?.address || '',
    });
  };

  // TODO: Implement
  const handleEdit = () => {};

  // TODO: Implement
  const handleDelete = () => {};

  const items = [
    {
      icon: <ContentCopyIcon />,
      label: 'Copy',
      action: handleCopy,
      color: 'primary' as 'primary',
    },
    {
      icon: <QrCodeIcon />,
      label: 'QR Code',
      action: handleQR,
      color: 'primary' as 'primary',
    },
    {
      icon: <ShareIcon />,
      label: 'Share',
      action: handleShare,
      color: 'secondary' as 'secondary',
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      action: handleEdit,
      color: 'info' as 'info',
    },
    {
      icon: <DeleteIcon />,
      label: 'Delete',
      action: handleDelete,
      color: 'error' as 'error',
    },
  ];

  return (
    <StyledMenu direction="row" gap={2} justifyContent="center">
      {items.map(({ label, icon, action, color }, index) => (
        <Fab
          size="medium"
          key={index}
          aria-label={label}
          onClick={action}
          color={color}
        >
          {icon}
        </Fab>
      ))}
    </StyledMenu>
  );
};

export default AddressMenu;

const StyledMenu = styled(Stack)`
  background-color: transparent;
  width: 100%;
`;
