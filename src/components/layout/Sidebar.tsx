import { ModeToggle } from '@core/ui/ModeToggle';

import AboutPortalo from '@core/components/AboutPortalo';
import MenuItems from '@core/components/MenuItems';
import ResetAccountButton from '@core/components/ResetAccountButton';
import SocialList from '@core/components/SocialList';
import UserSummary from '@core/components/UserSummary';
import { Separator } from '@core/ui/Separator';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="w-72 sticky left-0 top-0  h-screen flex flex-col border-r border-muted">
      <div className="w-72 bg-muted border-r border-muted-foreground/10 ">
        <UserSummary />
      </div>

      <div className="py-3 w-full">
        <MenuItems />

        <Separator />

        <SocialList />

        <Separator />

        <AboutPortalo />

        <ResetAccountButton />

        <Separator className="mt-2" />

        <div className="ml-4 mt-4">
          <ModeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
