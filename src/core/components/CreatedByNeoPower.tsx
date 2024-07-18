'use client';

import { EXTERNAL_LINKS } from '@constants/externalLinks.const';
import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import Image from 'next/image';
import Link from 'next/link';

const CreatedByNeoPower = () => {
  const createdByNeoPower = 'Created by NeoPower';

  const { trackNeoPowerSiteClicked } = useAnalytics();

  return (
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
  );
};

export default CreatedByNeoPower;
