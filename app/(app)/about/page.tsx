'use client';

import AppLogo from '@components/layout/AppLogo';
import { ROUTES } from '@constants/routes.const';
import CreatedByNeoPower from '@core/components/CreatedByNeoPower';
import { Separator } from '@core/ui/Separator';
import { TypographyMuted } from '@core/ui/Typography';
import Link from 'next/link';

const About = () => {
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
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <AppLogo width={200} height={30} />

        <TypographyMuted>
          Copyright © 2024 Portalo. All rights reserved
        </TypographyMuted>
      </div>

      <Separator className="mt-4" />
      <div className="flex flex-col items-center gap-4 p-5">
        {aboutItems.map(({ label, url }) => (
          <Link href={url} key={label}>
            <TypographyMuted>{label}</TypographyMuted>
          </Link>
        ))}
      </div>

      <Separator className="mb-4" />

      <CreatedByNeoPower />
    </div>
  );
};

export default About;
