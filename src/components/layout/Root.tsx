import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import Layout from './Layout';

interface RootProps {
  Component: any;
  pageProps: any;
}

const RecoilRoot = dynamic(
  () => import('recoil').then((recoil) => recoil.RecoilRoot),
  { ssr: false }
);

const Root: React.FC<RootProps> = ({ Component, pageProps }) => {
  return (
    <>
      <RecoilRoot>
        <Layout>
          <Suspense fallback={'Loading...'}>
            <SnackbarProvider autoHideDuration={3000} disableWindowBlurListener>
              <Component {...pageProps} />
            </SnackbarProvider>
          </Suspense>
        </Layout>
      </RecoilRoot>
    </>
  );
};

export default Root;
