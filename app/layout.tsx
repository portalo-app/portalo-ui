import { APP_SLOGAN, APP_TITLE } from '@constants/constants.const';
import '@styles/globals.css';
import { cn } from '@utils/utils';
import { Metadata, Viewport } from 'next';
import { DM_Sans as FontSans } from 'next/font/google';
import Script from 'next/script';

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_SLOGAN,
  manifest: 'app/manifest.json',
  category: 'website',
  generator: 'Next.js',
};

export const viewport: Viewport = {
  themeColor: '#8B5CF6',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const links = [{ rel: 'icon', href: '/favicon.ico' }];

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark notranslate" translate="no">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>

      <head>
        {links.map(({ rel, href }) => (
          <link key={href} rel={rel} href={href} />
        ))}
      </head>

      <body
        className={cn(
          'h-svh bg-background font-sans antialiased',
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
