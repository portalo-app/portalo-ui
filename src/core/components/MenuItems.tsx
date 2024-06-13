'use client';

import { ROUTES } from '@constants/routes.const';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@core/ui/NavigationMenu';
import { TypographyP } from '@core/ui/Typography';
import { cn } from '@utils/utils';
import { Bell, HelpCircle, Home, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    label: 'Home',
    href: ROUTES.APP,
    icon: <Home />,
  },
  {
    label: 'Spaces',
    href: ROUTES.APP_CREATE_SPACE,
    icon: <User />,
  },
  {
    label: 'Help',
    href: ROUTES.APP_HELP,
    icon: <HelpCircle />,
  },
  {
    label: 'Notification',
    href: ROUTES.APP_NOTIFICATION,
    icon: <Bell />,
  },
];

const MenuItems = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="w-vw p-2">
          {menuItems.map((item, index) => (
            <NavigationMenuItem
              key={index}
              className={cn(
                pathname === item.href &&
                  'border-l-4 border-primary text-primary ',
                'hover:text-primary'
              )}
            >
              <Link
                href={item.href}
                className="flex p-2 gap-2 w-full items-center"
              >
                {item.icon}

                <TypographyP className="!m-0">{item.label}</TypographyP>
              </Link>
            </NavigationMenuItem>
          ))}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuItems;
