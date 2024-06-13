'use client';

import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';
import Sidebar from '@components/layout/Sidebar';
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
        <main className="flex  flex-col w-full h-screen overflow-auto">
          <Navbar />
          <div className="mt-8 container max-w-md ">{children}</div>
        </main>
      </div>

      {!isDesktop ? <MobileBottomNavbar /> : null}
    </Root>
  );
}
