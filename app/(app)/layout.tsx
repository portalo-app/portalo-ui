'use client';

import MobileBottomNavbar from '@components/layout/MobileBottomNavbar';
import Navbar from '@components/layout/Navbar';
import Root from '@components/layout/Root';
import Sidebar from '@components/layout/Sidebar';
import { ALERT_MESSAGE } from '@constants/constants.const';
import AlertMessage from '@core/components/AlertMessage';
import { Toaster } from '@core/ui/Toaster';

import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';
import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  const isDesktop = useMediaQuery(MEDIAQUERY_DESKTOP);

  const { initializeGA } = useAnalytics();

  useEffect(() => {
    initializeGA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root>
      {ALERT_MESSAGE && <AlertMessage text={ALERT_MESSAGE} />}

      <motion.div
        className="flex w-full h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDesktop && <Sidebar />}

        <main className="flex flex-col w-full h-screen overflow-auto">
          <Navbar />

          <div className="mt-6 self-center md:w-112 lg:w-152 w-full px-6 md:px-0 pb-20">
            {children}
          </div>
        </main>
      </motion.div>

      <Toaster />

      {!isDesktop ? <MobileBottomNavbar /> : null}
    </Root>
  );
}
