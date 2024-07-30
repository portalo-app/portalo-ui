import AppLogo from '@components/layout/AppLogo';
import CreatedByNeoPower from '@core/components/CreatedByNeoPower';
import { Separator } from '@core/ui/Separator';
import { TypographyMuted } from '@core/ui/Typography';
import { FC } from 'react';

const About: FC = () => {
  return (
    <div className="flex flex-col justify-between h-[80vh]">
      <div className="flex flex-col items-center justify-center text-center">
        <AppLogo width={200} height={30} />

        <TypographyMuted>
          Copyright © 2024 Portalo. All rights reserved
        </TypographyMuted>
      </div>

      {/* <Separator className="mt-4" />

      <AboutItems /> */}

      <div>
        <Separator className="mb-4" />

        <CreatedByNeoPower />
      </div>
    </div>
  );
};

export default About;
