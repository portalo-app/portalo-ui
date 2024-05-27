import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <Root>
      <Navbar />

      <main className="container max-w-md px-4 mt-4 pb-[70px]">{children}</main>

      <MobileBottomNavbar />
      {/* {!isDesktop ? <MobileBottomNavbar /> : null} */}
    </Root>
  );
}
