import { getInitColorSchemeScript } from '@mui/material';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  links = [{ rel: 'icon', href: '/favicon.ico' }];

  render() {
    return (
      <Html lang="en">
        <Head>
          {this.links.map(({ rel, href }) => (
            <link key={href} rel={rel} href={href} />
          ))}

          <meta name="emotion-insertion-point" content="" />

          {(this.props as any).emotionStyleTags}
        </Head>

        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// MyDocument.getInitialProps = async (ctx: DocumentContext) => {
//   const originalRenderPage = ctx.renderPage;

//   // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
//   // However, be aware that it can have global side effects.
//   const cache = createEmotionCache();
//   const { extractCriticalToChunks } = createEmotionServer(cache);

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App: any) =>
//         function EnhanceApp(props) {
//           return <App emotionCache={cache} {...props} />;
//         },
//     });

//   const initialProps: any = await Document.getInitialProps(ctx);

//   // This is important. It prevents Emotion to render invalid HTML.
//   // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
//   const emotionStyles = extractCriticalToChunks(initialProps.html);
//   const emotionStyleTags = emotionStyles.styles.map((style) => (
//     <style
//       data-emotion={`${style.key} ${style.ids.join(' ')}`}
//       key={style.key}
//       // eslint-disable-next-line react/no-danger
//       dangerouslySetInnerHTML={{ __html: style.css }}
//     />
//   ));

//   return {
//     ...initialProps,
//     emotionStyleTags,
//   };
// };
