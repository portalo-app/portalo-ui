'use client';

import { EXTERNAL_LINKS } from '@constants/externalLinks.const';
import { TypographyMuted } from '@core/ui/Typography';
import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import Image from 'next/image';
import Link from 'next/link';

const CreatedByNeoPower = () => {
  const createdByNeoPower = 'Created by NeoPower';

  const { trackNeoPowerSiteClicked } = useAnalytics();

  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        href={EXTERNAL_LINKS.NEOPOWER}
        color="inherit"
        target="_blank"
        onClick={trackNeoPowerSiteClicked}
      >
        <div className="flex justify-center flex-row items-center">
          <Image
            src="/neopower.svg"
            alt="neopower"
            width="24"
            height="24"
            style={{ marginRight: '8px' }}
          />

          {createdByNeoPower}
        </div>
      </Link>

      {/* Free license requirements for Icons8 usage */}
      <TypographyMuted className="opacity-50">
        Icons by{' '}
        <a target="_blank" href="https://icons8.com/">
          Icons8
        </a>
      </TypographyMuted>
    </div>
  );
};

export default CreatedByNeoPower;
