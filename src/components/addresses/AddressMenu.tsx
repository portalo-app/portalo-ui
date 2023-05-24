import { Address } from '@/lib/model/address';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShareIcon from '@mui/icons-material/Share';
import { Fade, IconButton, Stack, styled } from '@mui/material';

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

  const items = [
    {
      icon: <ContentCopyIcon />,
      label: 'Copy',
      action: handleCopy,
      color: 'default' as 'default',
    },
    {
      icon: <QrCodeIcon />,
      label: 'QR Code',
      action: handleQR,
      color: 'default' as 'default',
    },
    {
      icon: <ShareIcon />,
      label: 'Share',
      action: handleShare,
      color: 'default' as 'default',
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      action: handleEdit,
      color: 'default' as 'default',
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
        <Fade in key={index} timeout={index * 200}>
          <IconButton
            size="large"
            aria-label={label}
            onClick={action}
            color={color}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {icon}
          </IconButton>
        </Fade>
      ))}
    </StyledMenu>
  );
};

export default AddressMenu;

const StyledMenu = styled(Stack)`
  background-color: transparent;
  width: 100%;
`;
