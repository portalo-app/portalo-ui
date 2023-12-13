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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
