'use client';

import { ROUTES } from '@constants/routes.const';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@core/ui/NavigationMenu';
import { TypographyP } from '@core/ui/Typography';
import { Bell, HelpCircle, User } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    label: 'Spaces',
    href: ROUTES.APP,
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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="w-vw p-2">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
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
