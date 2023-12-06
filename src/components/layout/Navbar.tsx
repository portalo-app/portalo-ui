import DeleteModal from '@/core/components/DeleteModal';
import { Button } from "@/core/ui/Button";
import { Separator } from '@/core/ui/Separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/core/ui/Sheet";
import { EXTERNAL_LINKS } from '@/lib/constants/externalLinks.const';
import { ROUTES } from '@/lib/constants/routes.const';
import { profilesState } from '@/lib/store/profiles.atom';
import { Menu, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import DrawerMenuItems from './DrawerMenuItems';
interface NavbarProps { }

const PortaloLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        priority
        src="/portalo_dark.svg"
        alt="Portalo"
        width={150}
        height={150}
      />
    </div>
  )
}

const Navbar: React.FC<NavbarProps> = () => {
  const resetProfiles = useResetRecoilState(profilesState);
  const [resetAccountModalOpen, setResetAccountModalOpen] = useState(false);
  const router = useRouter();

  const resetAccountLabel = 'Reset Account';
  const resetAccountMessage =
    'Are you sure you want to clear the account data? This will remove every profile and all the data associated with them. This action cannot be undone.';

  const createdByNeoPower = 'Created by NeoPower';
  const resetAccount = () => {
    router.push(ROUTES.APP);
    resetProfiles();

    setResetAccountModalOpen(false);
  };

  const handleResetAccountModal = () => {
    setResetAccountModalOpen(!resetAccountModalOpen)
  }

  return (
    <>
      <div className='sticky pl-4 top-0 z-50 flex w-full items-center justify-between p-3 shadow bg-foreground shadow-white'>

        <Sheet >
          <SheetTrigger asChild>
            <Menu color='white' />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-foreground">
            <SheetHeader>
              <SheetTitle>
                <PortaloLogo />
              </SheetTitle>
            </SheetHeader>
            <Separator />
            <SheetDescription className='flex flex-col h-full'>
              <div>
                <DrawerMenuItems />
              </div>
              <Separator />
              <div className='flex flex-col mt-4'>
                <Button
                  variant="outline"
                  className='text-destructive hover:text-destructive-foreground border-destructive bg-destructive-foreground hover:border-destructive-foreground hover:bg-destructive'
                  onClick={handleResetAccountModal}
                >
                  <Trash2 className='mr-2' />
                  {resetAccountLabel}
                </Button>
                <div className='mt-4 text-secondary p-1'>
                  <Link href={EXTERNAL_LINKS.NEOPOWER} color="inherit" target="_blank">
                    <div className='flex justify-center flex-row items-center'>
                      <Image
                        src="/neopower.svg"
                        alt="neopower"
                        width="24"
                        height="24"
                        style={{ marginRight: "8px" }}
                      />
                      {createdByNeoPower}
                    </div>
                  </Link>
                </div>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
        <DeleteModal
          title={resetAccountLabel}
          message={resetAccountMessage}
          open={resetAccountModalOpen}
          onClose={handleResetAccountModal}
          onDelete={resetAccount}
        />
        <Link href={ROUTES.HOME} className="animate-slide-in-right text-xl">
          <PortaloLogo />
        </Link>
      </div >
    </>
  );
};

export default Navbar;
