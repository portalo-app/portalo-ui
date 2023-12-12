import createEmotionCache from '@/styles/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const Root: React.FC<RootProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  return (
    <>
      <RecoilRoot>
        <CacheProvider value={emotionCache}>
          <Layout>
            <Suspense fallback={'Loading...'}>
              <SnackbarProvider
                autoHideDuration={3000}
                disableWindowBlurListener
              >
                <Component {...pageProps} />
              </SnackbarProvider>
            </Suspense>
          </Layout>
        </CacheProvider>
      </RecoilRoot>
    </>
  );
};

export default Root;
