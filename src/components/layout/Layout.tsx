import { Container } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>
        <Container maxWidth="sm">{children}</Container>
      </main>
    </>
  );
};

export default Layout;
