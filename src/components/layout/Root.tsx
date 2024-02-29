'use client';

import { wallets } from '@cosmos-kit/leap';
import { ChainProvider } from '@cosmos-kit/react';
import { ThemeProvider } from '@providers/ThemeProvider';
import { assets, chains } from 'chain-registry';
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
          <ChainProvider
            chains={chains} // supported chains
            assetLists={assets} // supported asset lists
            wallets={wallets} // supported wallets
          >
            <ThemeProvider>
              <SnackbarProvider
                autoHideDuration={3000}
                disableWindowBlurListener
              >
                {children}
              </SnackbarProvider>
            </ThemeProvider>
          </ChainProvider>
        </Suspense>
      </RecoilRoot>
    </>
  );
};

export default Root;
