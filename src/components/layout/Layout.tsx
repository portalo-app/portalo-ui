import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>
        <div className='flex content-center justify-center'>{children}</div>
      </main>
    </>
  );
};

export default Layout;
