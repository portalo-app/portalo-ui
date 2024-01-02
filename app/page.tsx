import { APP_SLOGAN } from '@constants/constants';
import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyH1, TypographyH3 } from '@core/ui/Typography';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>
        <TypographyH1 className="pt-8 text-center max-w-lg">
          {APP_SLOGAN}
        </TypographyH1>
        <TypographyH3 className="m-4 max-w-lg text-center">
          Start using Portalo and make it easier to find an address
        </TypographyH3>
        <div className="flex justify-center mt-5">
          <Button asChild>
            <Link href={ROUTES.APP} className="text-xl">
              Start now!
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
