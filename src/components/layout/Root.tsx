'use client';

import { ThemeProvider } from '@providers/ThemeProvider';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';

interface RootProps {
  children: React.ReactNode;
}

const RecoilRoot = dynamic(
  () => import('recoil').then((recoil) => recoil.RecoilRoot),
  { ssr: false }
);

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <>
      <RecoilRoot>
        <Suspense fallback={'Loading...'}>
          <ThemeProvider>
            <SnackbarProvider autoHideDuration={3000} disableWindowBlurListener>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </Suspense>
      </RecoilRoot>
    </>
  );
};

export default Root;
