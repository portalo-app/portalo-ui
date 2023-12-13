import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-background to-primary from-70% min-h-screen">
        <div className="flex content-center justify-center">{children}</div>
      </main>
    </>
  );
};

export default Layout;
