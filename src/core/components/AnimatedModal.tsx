import { Fade, Modal, Stack } from '@mui/material';

interface AnimatedModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  children,
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Stack
          gap={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
          }}
        >
          {children}
        </Stack>
      </Fade>
    </Modal>
  );
};

export default AnimatedModal;
