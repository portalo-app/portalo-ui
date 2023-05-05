import { Address } from '@/lib/model/address';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShareIcon from '@mui/icons-material/Share';
import { Fab, Stack, styled } from '@mui/material';

interface AddressMenuProps {
  selectedAddress: Address;
}

const AddressMenu: React.FC<AddressMenuProps> = ({ selectedAddress }) => {
  const handleCopy = () => {
    // Copy selectedAddress.address to clipboard
    navigator?.clipboard?.writeText(selectedAddress?.address || '');
  };

  // TODO: Implement
  const handleQR = () => {};

  const handleShare = () => {
    // Share selectedAddress.address via navigator.share
    navigator?.share({
      title: selectedAddress?.name || '',
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
    },
    {
      icon: <QrCodeIcon />,
      label: 'QR Code',
      action: handleQR,
    },
    {
      icon: <ShareIcon />,
      label: 'Share',
      action: handleShare,
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      action: handleEdit,
    },
    {
      icon: <DeleteIcon />,
      label: 'Delete',
      action: handleDelete,
    },
  ];

  return (
    <StyledMenu direction="row" gap={2} justifyContent="center">
      {items.map(({ label, icon, action }, index) => (
        <Fab size="medium" key={index} aria-label={label} onClick={action}>
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
