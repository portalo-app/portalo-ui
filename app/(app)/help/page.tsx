import Help from '@components/help/Help';
import { NextPage } from 'next';

interface HelpPageProps {}

const HelpPage: NextPage<HelpPageProps> = () => {
  return <Help />;
};

export default HelpPage;
