'use client';

import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyMuted } from '@core/ui/Typography';
import { useRouter } from 'next/navigation';

const PortaloCTA = () => {
  const router = useRouter();

  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={() => router.push(ROUTES.APP)}>
        Create your own profile
      </Button>

      <TypographyMuted className="text-center">
        and start your journey with Portalo 🚀️
      </TypographyMuted>
    </div>
  );
};

export default PortaloCTA;
