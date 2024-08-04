'use client';

import { ThemeProvider } from '@providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@utils/wagmiConfig';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { WagmiProvider } from 'wagmi';

interface RootProps {
  children: React.ReactNode;
}

const RecoilRoot = dynamic(
  () => import('recoil').then((recoil) => recoil.RecoilRoot),
  { ssr: false }
);

const queryClient = new QueryClient();

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <>
      <RecoilRoot>
        <Suspense fallback={'Loading...'}>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider>
                <SnackbarProvider
                  autoHideDuration={3000}
                  disableWindowBlurListener
                >
                  {children}
                </SnackbarProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </Suspense>
      </RecoilRoot>
    </>
  );
};

export default Root;
