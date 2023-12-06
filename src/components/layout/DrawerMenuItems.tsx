import { Separator } from '@/core/ui/Separator';
import { ROUTES } from '@/lib/constants/routes.const';
import { profilesState } from '@/lib/store/profiles.atom';
import Avvvatars from 'avvvatars-react';
import { HelpCircle, Home, Settings, User } from 'lucide-react';
import { useRecoilValue } from 'recoil';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/core/ui/NavigationMenu";
import Link from 'next/link';



const menuItems = [
  {
    label: 'Home',
    href: ROUTES.HOME,
    icon: <Home color="#eae1e1" strokeWidth={1.75} />,
  },
  {
    label: 'Profiles',
    href: ROUTES.APP,
    icon: <User color="#eae1e1" strokeWidth={1.75} />,
  },
  {
    label: 'Help',
    href: ROUTES.APP_HELP,
    icon: <HelpCircle color="#eae1e1" strokeWidth={1.75} />,
  },
  {
    label: 'Settings',
    href: ROUTES.APP,
    icon: <Settings color="#eae1e1" strokeWidth={1.75} />,
  },
];

const DrawerMenuItems: React.FC = () => {
  const profiles = useRecoilValue(profilesState);

  const welcomeMessage = 'Hi anon! 👋🏻';
  const profilesCount = profiles?.length || 0;
  const profilesCountMessage = `${profilesCount} profile${profilesCount > 1 ? 's' : ''
    }`;
  const noProfilesMessage = 'No profiles yet';

  return (
    <>

      <div className='p-2 my-4'>
        <div className="flex flex-row content-center gap-3" >
          <Avvvatars value={profiles.toString()} size={48} style="shape" />

          <div>
            <h6 className='text-secondary text-xl'>{welcomeMessage}</h6>

            <p className="text-primary text-sm">
              {profilesCount ? profilesCountMessage : noProfilesMessage}
            </p>
          </div>
        </div>
      </div>

      <Separator />


      <NavigationMenu >
        <NavigationMenuList>
          <div className="flex flex-col w-vw p-2">

            {menuItems.map((item, index) => (
              <NavigationMenuItem
                key={index}
              >
                <Link href={item.href} className='flex p-2 hover-primary w-full'>
                  {item.icon}
                  <span className='text-secondary text-lg pl-2'>
                    {item.label}
                  </span>
                </Link>
              </NavigationMenuItem>
            ))}
          </div>
        </NavigationMenuList>
      </NavigationMenu >
    </>
  );
};

export default DrawerMenuItems;
