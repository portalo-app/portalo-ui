import { Separator } from '@core/ui/Separator';

import MenuItems from '@core/components/MenuItems';
import UserSummary from '@core/components/UserSummary';

const DrawerMenuItems: React.FC = () => {
  return (
    <>
      <UserSummary />

      <Separator />

      <MenuItems />
    </>
  );
};

export default DrawerMenuItems;
