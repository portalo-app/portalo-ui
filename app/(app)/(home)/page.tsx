import Home from '@components/home/HomeCardsList.server';
import { NextPage } from 'next';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
  return <Home />;
};

export default HomePage;
