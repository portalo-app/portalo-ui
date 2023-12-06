import { Button } from "@/core/ui/Button";
import { APP_SLOGAN } from "@/lib/constants/constants";
import { ROUTES } from '@/lib/constants/routes.const';
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col content-center justify-center p-4 bg-foreground w-full">
        <h1 className='text-5xl text-secondary m-4 text-center bg-gradient-to-r bg-gra'>{APP_SLOGAN}</h1>
        <h2 className="text-xl text-secondary m-4 text-center">
          Start using Portalo and make it easier to find an address
        </h2>
        <div className='flex justify-around mt-5'>

          <Button
            className="w-[250px] rounded-3xl h-12"
            asChild
          >
            <Link href={ROUTES.APP} className="text-lg">
              Start now!
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
