'use client';

import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';
import Sidebar from '@components/layout/Sidebar';
import AlertMessage from '@core/components/AlertMessage';
import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  const isDesktop = useMediaQuery(MEDIAQUERY_DESKTOP);

  return (
    <Root>
      <div className="flex w-full h-screen">
        {isDesktop && <Sidebar />}
        <main className="flex flex-col w-full h-screen overflow-auto">
          <Navbar />
          <AlertMessage />
          <div className="mt-6 self-center md:w-96 w-full px-6 md:px-0 pb-20">
            {children}
          </div>
        </main>
      </div>

      {!isDesktop ? <MobileBottomNavbar /> : null}
    </Root>
  );
}
