import DeleteModal from '@/core/components/DeleteModal';
import NavbarLayout from '@/core/components/NavbarLayout';
import { EXTERNAL_LINKS } from '@/lib/constants/externalLinks.const';
import { ROUTES } from '@/lib/constants/routes.const';
import { profilesState } from '@/lib/store/profiles.atom';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, IconButton, Link, Stack, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import DrawerMenuItems from './DrawerMenuItems';

interface NavbarProps { }

const LayoutOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar: React.FC<NavbarProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const resetProfiles = useResetRecoilState(profilesState);
  const [resetAccountModalOpen, setResetAccountModalOpen] = useState(false);
  const router = useRouter();

  const resetAccountLabel = 'Reset Account';
  const resetAccountMessage =
    'Are you sure you want to clear the account data? This will remove every profile and all the data associated with them. This action cannot be undone.';

  const createdByNeoPower = 'Created by NeoPower';
  const resetAccount = () => {
    router.push(ROUTES.APP);
    resetProfiles();

    setResetAccountModalOpen(false);
    setIsDrawerOpen(false);
  };

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
            height: '100%',
            maxWidth: '300px',
          },
        }}
      >
        <Stack justifyContent="space-between" height="100%">
          <Stack>
            <DrawerMenuItems
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            />
          </Stack>

          <Stack px={2} mb={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setResetAccountModalOpen(true)}
              startIcon={<DeleteIcon />}
            >
              {resetAccountLabel}
            </Button>
            <Stack mt={2} alignItems="center">
              <Link href={EXTERNAL_LINKS.NEOPOWER} color="inherit" underline="none" target="_blank">
                <Stack direction="row" alignItems="center">
                  <Image
                    src="/neopower.svg"
                    alt="neopower"
                    width="24"
                    height="24"
                    style={{ marginRight: "8px" }}
                  />
                  {createdByNeoPower}
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>

      <DeleteModal
        title={resetAccountLabel}
        message={resetAccountMessage}
        open={resetAccountModalOpen}
        onClose={() => {
          setResetAccountModalOpen(false);
        }}
        onDelete={resetAccount}
      />
    </>
  );
};

export default Navbar;
