'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyP } from '@core/ui/Typography';
import { cn } from '@utils/utils';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AboutPortalo = () => {
  const aboutPortalo = 'About Portalo';
  const pathname = usePathname();
  return (
    <Link
      href={ROUTES.APP_ABOUT}
      className={cn(
        pathname === ROUTES.APP_ABOUT &&
          'border-l-4 border-primary text-primary',
        'flex mt-4 px-4 gap-2 hover:text-primary'
      )}
    >
      <Info />
      <TypographyP className="!m-0">{aboutPortalo}</TypographyP>
    </Link>
  );
};

export default AboutPortalo;
