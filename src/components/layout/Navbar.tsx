import NavbarLayout from '@/core/components/NavbarLayout';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, styled } from '@mui/material';
import { useState } from 'react';
import DrawerMenuItems from './DrawerMenuItems';

interface NavbarProps {}

const LayoutOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar: React.FC<NavbarProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <NavbarLayout
        leftSide={
          <IconButton
            aria-label={isDrawerOpen ? 'close menu' : 'open menu'}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        }
      />

      <LayoutOffset sx={{ mb: 4 }} />

      <Drawer
        anchor="left"
        elevation={0}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '300px',
          },
        }}
      >
        <DrawerMenuItems
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
