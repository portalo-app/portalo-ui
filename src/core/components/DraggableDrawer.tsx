import { Box, SwipeableDrawer, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

interface DraggableDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DraggableDrawer: React.FC<DraggableDrawerProps> = ({
  open,
  onOpen,
  onClose,
  children,
}) => {
  return (
    <SwipeableDrawer
      disableDiscovery
      disableBackdropTransition
      disableSwipeToOpen
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        elevation: 1,
        sx: {
          borderRadius: '24px 24px 0 0',
          p: 4,
          pb: 8,
        },
      }}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Puller />

      {children}
    </SwipeableDrawer>
  );
};

export default DraggableDrawer;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
