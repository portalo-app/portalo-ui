'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyMuted } from '@core/ui/Typography';
import Link from 'next/link';
import { FC } from 'react';

const AboutItems: FC = () => {
  const aboutItems = [
    {
      label: 'Privacy policy',
      url: ROUTES.APP_PRIVACY_POLICY,
    },
    {
      label: 'Terms and conditions',
      url: ROUTES.APP_TERMS_AND_CONDITIONS,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 p-5">
      {aboutItems.map(({ label, url }) => (
        <Link href={url} key={label}>
          <TypographyMuted>{label}</TypographyMuted>
        </Link>
      ))}
    </div>
  );
};

export default AboutItems;
