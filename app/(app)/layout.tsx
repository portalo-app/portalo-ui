'use client';

import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';
import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { useEffect } from 'react';
interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  const { initializeGA } = useAnalytics();

  useEffect(() => {
    initializeGA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root>
      <Navbar />

      <main className="container max-w-md px-4 mt-4 pb-[70px]">{children}</main>

      <MobileBottomNavbar />
      {/* {!isDesktop ? <MobileBottomNavbar /> : null} */}
    </Root>
  );
}
