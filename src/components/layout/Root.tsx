'use client';

import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import Layout from './Layout';

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
        <Layout>
          <Suspense fallback={'Loading...'}>
            <SnackbarProvider autoHideDuration={3000} disableWindowBlurListener>
              {children}
            </SnackbarProvider>
          </Suspense>
        </Layout>
      </RecoilRoot>
    </>
  );
};

export default Root;
