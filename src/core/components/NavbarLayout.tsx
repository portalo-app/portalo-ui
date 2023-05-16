import {
  AppBar as MUIAppBar,
  Toolbar as MUIToolbar,
  styled,
} from '@mui/material';

interface NavbarLayoutProps {
  leftSide: React.ReactElement;
  rightSide?: React.ReactElement;
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({ leftSide, rightSide }) => {
  return (
    <MUIAppBar elevation={0}>
      <Toolbar>
        {leftSide}

        {rightSide}
      </Toolbar>
    </MUIAppBar>
  );
};

export default NavbarLayout;

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`;
