import { APP_SLOGAN } from '@constants/constants';
import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyH1, TypographyH3 } from '@core/ui/Typography';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col p-4">
        <TypographyH1 className="text-5xl my-4 pt-8 text-center max-w-lg font-bold">
          {APP_SLOGAN}
        </TypographyH1>
        <div className="flex justify-center">
          <TypographyH3 className="text-xl ml-8 my-4 text-center max-w-sm ">
            Start using Portalo and make it easier to find an address
          </TypographyH3>
        </div>
        <div className="flex justify-center mt-5">
          <Button
            className="w-[250px] rounded-3xl h-12 text-primary border-2 border-primary ease-in duration-200 bg-background"
            asChild
          >
            <Link href={ROUTES.APP} className="text-xl">
              Start now!
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
