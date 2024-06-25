import AboutPortalo from '@core/components/AboutPortalo';
import MenuItems from '@core/components/MenuItems';
import ResetAccountButton from '@core/components/ResetAccountButton';
import SocialList from '@core/components/SocialList';
import UserSummary from '@core/components/UserSummary';
import { ModeToggle } from '@core/ui/ModeToggle';
import { Separator } from '@core/ui/Separator';

const Settings = () => {
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

      <AboutPortalo />

      <ResetAccountButton />
    </div>
  );
};

export default Settings;
