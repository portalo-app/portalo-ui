import Onboarding from '@components/onboarding/Onboarding';
import { FC } from 'react';
import HomeCardsList from './HomeCardList';

const Home: FC = () => {
  return (
    <div className="space-y-6">
      <Onboarding />

      <HomeCardsList />
    </div>
  );
};

export default Home;
