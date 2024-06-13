import { ROUTES } from '@constants/routes.const';
import CreatedByNeoPower from '@core/components/CreatedByNeoPower';
import MenuItems from '@core/components/MenuItems';
import SocialList from '@core/components/SocialList';
import UserSummary from '@core/components/UserSummary';
import { ModeToggle } from '@core/ui/ModeToggle';
import { Separator } from '@core/ui/Separator';
import { TypographyP } from '@core/ui/Typography';
import { Info } from 'lucide-react';
import Link from 'next/link';

const Settings = () => {
  const aboutPortalo = 'About Portalo';

  return (
    <div>
      <div>
        <UserSummary />

        <Separator />

        <MenuItems />
        <div className="ml-4">
          <ModeToggle />
        </div>
      </div>

      <Separator className="mt-4" />

      <SocialList />

      <Separator />

      <Link href={ROUTES.APP_ABOUT} className="flex mt-4 px-4 gap-2">
        <Info />
        <TypographyP className="!m-0">{aboutPortalo}</TypographyP>
      </Link>

      <div className="relative top-24">
        <CreatedByNeoPower />
      </div>
    </div>
  );
};

export default Settings;
