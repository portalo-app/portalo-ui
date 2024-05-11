import '@styles/globals.css';
import { cn } from '@utils/utils';
import { Metadata, Viewport } from 'next';
import { DM_Sans as FontSans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Portalo | Address Tree',
  description: 'Take your addresses everywhere',
};

export const viewport: Viewport = {
  themeColor: '#8B5CF6',
  width: 'device-width',
  initialScale: 1,
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
