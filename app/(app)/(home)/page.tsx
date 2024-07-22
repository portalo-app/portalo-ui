import Home from '@components/home/Home';
import { NextPage } from 'next';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
  return <Home />;
};

export default HomePage;
