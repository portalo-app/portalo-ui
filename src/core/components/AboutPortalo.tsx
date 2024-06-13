import { ROUTES } from '@constants/routes.const';
import { TypographyP } from '@core/ui/Typography';
import { Info } from 'lucide-react';
import Link from 'next/link';

const AboutPortalo = () => {
  const aboutPortalo = 'About Portalo';

  return (
    <Link href={ROUTES.APP_ABOUT} className="flex mt-4 px-4 gap-2">
      <Info />
      <TypographyP className="!m-0">{aboutPortalo}</TypographyP>
    </Link>
  );
};

export default AboutPortalo;
