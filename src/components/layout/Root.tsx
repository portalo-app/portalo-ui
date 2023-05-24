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
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Layout from './Layout';

interface RootProps {
  Component: any;
  pageProps: any;
  emotionCache?: EmotionCache;
}

const globalStyles = <GlobalStyles />;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const Root: React.FC<RootProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <RecoilRoot>
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
      </RecoilRoot>
    </>
  );
};

export default Root;
