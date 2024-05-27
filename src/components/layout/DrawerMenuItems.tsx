import { ROUTES } from '@constants/routes.const';
import { Separator } from '@core/ui/Separator';
import { spacesState } from '@states/spaces.atom';
import Avvvatars from 'avvvatars-react';
import { HelpCircle, Settings, User } from 'lucide-react';
import { useRecoilValue } from 'recoil';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@core/ui/NavigationMenu';
import {
  TypographyLead,
  TypographyP,
  TypographySmall,
} from '@core/ui/Typography';
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
    label: 'Settings',
    href: ROUTES.APP,
    icon: <Settings />,
  },
];

const DrawerMenuItems: React.FC = () => {
  const spaces = useRecoilValue(spacesState);

  const welcomeMessage = 'Hi anon! 👋🏻';
  const spacesCount = spaces?.length || 0;
  const spacesCountMessage = `${spacesCount} space${
    spacesCount > 1 ? 's' : ''
  }`;
  const emptyMessage = 'No spaces yet';

  return (
    <>
      <div className="p-2 my-4">
        <div className="flex flex-row content-center gap-3">
          <Avvvatars value={spaces.toString()} size={48} style="shape" />

          <div>
            <TypographyLead>{welcomeMessage}</TypographyLead>

            <TypographySmall className="text-primary">
              {spacesCount ? spacesCountMessage : emptyMessage}
            </TypographySmall>
          </div>
        </div>
      </div>

      <Separator />

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
    </>
  );
};

export default DrawerMenuItems;
