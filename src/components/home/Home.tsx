import StoreWidget from '@components/dashboard/StoreWidget';
import Onboarding from '@components/onboarding/Onboarding';
import { Button } from '@core/ui/Button';
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { FC } from 'react';
import HomeCardsList from './HomeCardList';

const Home: FC = () => {
  return (
    <div className="space-y-4">
      <Onboarding />

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

      <HomeCardsList />
    </div>
  );
};

export default Home;
