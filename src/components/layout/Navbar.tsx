'use client';

import { ROUTES_LAYOUT } from '@constants/routes.const';
import { usePathname } from 'next/navigation';
import FeatureHeader from './FeatureHeader';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const currentRoute = ROUTES_LAYOUT.find((route) => route.url === pathname);

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-muted p-1 pl-2 border-b border-muted-foreground">
      <FeatureHeader title={currentRoute?.title ?? ''} />
    </div>
  );
};

export default Navbar;
