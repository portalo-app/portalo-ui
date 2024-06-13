'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyXS } from '@core/ui/Typography';
import { Bell, Home, Menu, Plus, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Portalo = () => {
  return (
    <Image
      src="/assets/images/portalo_icon.svg"
      alt="Portalo"
      width={48}
      height={48}
    />
  );
};

const MobileBottomNavbar = () => {
  const pathname = usePathname();

  const isRouteReadOnly = true;

  const navbarItems = [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      url: ROUTES.APP,
    },
    {
      id: 'spaces',
      name: 'Spaces',
      icon: User,
      url: ROUTES.APP_CREATE_SPACE,
    },
    {
      id: 'cta',
      name: 'CTA',
      icon: Portalo,
      isCTA: true,
      url: ROUTES.APP_CREATE_SPACE,
    },
    {
      id: 'notification',
      name: 'Notification',
      icon: Bell,
      url: ROUTES.APP_NOTIFICATION,
    },
    {
      id: 'settings',
      name: 'More',
      icon: Menu,
      url: ROUTES.APP_SETTINGS,
    },
  ];

  return !isRouteReadOnly ? null : (
    <div className="fixed bottom-0 grid w-full grid-cols-5 bg-muted">
      {navbarItems.map(({ id, name, icon: Icon, isCTA, url }) => (
        <div key={id} className="grid place-items-center">
          {isCTA ? (
            <Link
              href={url}
              className="relative bottom-2 grid h-14 w-14 place-items-center rounded-full bg-primary"
            >
              <Plus size={40} />
            </Link>
          ) : (
            <Link
              href={url}
              className="grid place-items-center gap-2 place-self-center active:text-secondary"
            >
              <Icon
                size={20}
                className={`${pathname === url && 'text-primary brightness-150'}`}
              />

              <TypographyXS
                className={`font-medium ${pathname === url && 'text-primary brightness-150'}`}
              >
                {name}
              </TypographyXS>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileBottomNavbar;
