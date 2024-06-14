'use client';

import { ROUTES, ROUTES_LAYOUT } from '@constants/routes.const';
import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';
import { extractRouteFromPathname } from '@utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from './AppLogo';
import FeatureHeader from './FeatureHeader';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const route = extractRouteFromPathname(pathname);
  const currentRoute = ROUTES_LAYOUT.find(
    (routeItem) => routeItem.url === route
  );

  const isDesktop = useMediaQuery(MEDIAQUERY_DESKTOP);

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-muted p-1 pl-2">
      {currentRoute?.title === 'Home' ? (
        <Link href={ROUTES.APP}>
          <AppLogo width={isDesktop ? 155 : 100} height={90} />
        </Link>
      ) : (
        <FeatureHeader title={currentRoute?.title ?? ''} />
      )}
    </div>
  );
};

export default Navbar;
