import StoreWidget from '@components/dashboard/StoreWidget';
import HomeClientContainer from '@components/home/Home.client';
import { Button } from '@core/ui/Button';
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { FunctionComponent } from 'react';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  return (
    <div className="space-y-4">
      <ResponsiveDialog
        title="Coming soon"
        description="✨ Soon you'll be able to store ANYTHING ANYWHERE ✨"
        trigger={<StoreWidget />}
      >
        <div className="space-y-4 flex flex-col justify-center">
          <Input disabled placeholder="Input Anything!" />
          <Button disabled>Store Anywhere</Button>
        </div>
      </ResponsiveDialog>

      <HomeClientContainer />
    </div>
  );
};

export default AppPage;
