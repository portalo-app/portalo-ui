'use client';

import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';
import Sidebar from '@components/layout/Sidebar';
import { Alert, AlertDescription } from '@core/ui/Alert';
import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';
import { Info } from 'lucide-react';

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
          <div className="mt-6 self-center md:w-96 w-full px-6 md:px-0 pb-20">
            <Alert variant={'default'} className="mb-4">
              <AlertDescription className="flex items-center gap-2 justify-center">
                <Info />
                This is an Alpha version of the App
              </AlertDescription>
            </Alert>
            {children}
          </div>
        </main>
      </div>

      {!isDesktop ? <MobileBottomNavbar /> : null}
    </Root>
  );
}
