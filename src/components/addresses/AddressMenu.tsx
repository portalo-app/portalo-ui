import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShareIcon from '@mui/icons-material/Share';
import { Fab, Menu, styled } from '@mui/material';

interface AddressMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const items = [
  {
    icon: <ContentCopyIcon />,
    label: 'Copy',
  },
  {
    icon: <QrCodeIcon />,
    label: 'QR Code',
  },
  {
    icon: <ShareIcon />,
    label: 'Share',
  },
  {
    icon: <EditIcon />,
    label: 'Edit',
  },
  {
    icon: <DeleteIcon />,
    label: 'Delete',
  },
];

const AddressMenu: React.FC<AddressMenuProps> = ({ anchorEl, handleClose }) => {
  return (
    <StyledMenu
      id="address-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={0}
      MenuListProps={{
        'aria-labelledby': 'Address menu',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {items.map((fab, index) => (
        <Fab
          size="medium"
          key={index}
          aria-label={fab.label}
          onClick={() => {}}
        >
          {fab.icon}
        </Fab>
      ))}
    </StyledMenu>
  );
};

export default AddressMenu;

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: transparent;
    width: 100%;
  }

  .MuiList-root {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`;
