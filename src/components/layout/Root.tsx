import useIsMobile from '@/lib/hooks/common/useIsMobile';
import createEmotionCache from '@/styles/createEmotionCache';
import GlobalStyles from '@/styles/globals.style';
import { THEME } from '@/styles/theme.style';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { createPublicClient, http } from 'viem';
import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import Layout from './Layout';

interface RootProps {
  Component: any;
  pageProps: any;
  emotionCache?: EmotionCache;
}

const RecoilRoot = dynamic(
  () => import('recoil').then((recoil) => recoil.RecoilRoot),
  { ssr: false }
);

const globalStyles = <GlobalStyles />;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
});

const Root: React.FC<RootProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <RecoilRoot>
        <WagmiConfig config={config}>
          <CacheProvider value={emotionCache}>
            {globalStyles}

            <ThemeProvider theme={responsiveFontSizes(createTheme(THEME))}>
              <CssBaseline enableColorScheme />

              <Layout>
                <Suspense fallback={'Loading...'}>
                  <SnackbarProvider
                    autoHideDuration={3000}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: isMobile ? 'center' : 'left',
                    }}
                    dense={isMobile}
                    disableWindowBlurListener
                  >
                    <Component {...pageProps} />
                  </SnackbarProvider>
                </Suspense>
              </Layout>
            </ThemeProvider>
          </CacheProvider>
        </WagmiConfig>
      </RecoilRoot>
    </>
  );
};

export default Root;
