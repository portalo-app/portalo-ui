import Help from '@components/help/Help.server';
import { NextPage } from 'next';

interface HelpPageProps {}

const HelpPage: NextPage<HelpPageProps> = () => {
  return <Help />;
};

export default HelpPage;
