'use client';

import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';
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
      <Navbar />

      <main className="container max-w-md px-4 mt-4 pb-[70px]">{children}</main>

      {!isDesktop ? <MobileBottomNavbar /> : null}
    </Root>
  );
}
