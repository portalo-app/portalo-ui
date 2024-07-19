import AboutItems from '@components/about/AboutItems.client';
import AppLogo from '@components/layout/AppLogo';
import CreatedByNeoPower from '@core/components/CreatedByNeoPower';
import { Separator } from '@core/ui/Separator';
import { TypographyMuted } from '@core/ui/Typography';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <AppLogo width={200} height={30} />

        <TypographyMuted>
          Copyright © 2024 Portalo. All rights reserved
        </TypographyMuted>
      </div>

      <Separator className="mt-4" />

      <AboutItems />

      <Separator className="mb-4" />

      <CreatedByNeoPower />
    </div>
  );
};

export default About;
