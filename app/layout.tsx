import Root from '@components/layout/Root';
import '@styles/globals.css';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Portalo | Address Tree',
  description: 'Take your addresses everywhere',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Import this in your top-level route/layout
import '@interchain-ui/react/styles';

const links = [{ rel: 'icon', href: '/favicon.ico' }];

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {links.map(({ rel, href }) => (
        <link key={href} rel={rel} href={href} />
      ))}

      <body>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
