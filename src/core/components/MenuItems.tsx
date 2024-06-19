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
    label: 'Notifications',
    href: ROUTES.APP_NOTIFICATION,
    icon: <Bell />,
  },
];

const MenuItems = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="py-2">
          {menuItems.map((item, index) => (
            <NavigationMenuItem
              key={index}
              className={cn(
                pathname === item.href &&
                  'border-l-4 border-primary text-primary ',
                'hover:bg-primary/5 px-2 w-72'
              )}
            >
              <Link href={item.href} className="flex p-2 gap-2 items-center">
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
