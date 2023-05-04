import { styled } from '@mui/material';

interface NavbarProps {}

const LayoutOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar: React.FC<NavbarProps> = () => {
  return <LayoutOffset aria-hidden="true" />;
};

export default Navbar;
