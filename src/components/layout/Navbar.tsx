import { EXTERNAL_LINKS } from '@constants/externalLinks.const';
import { ROUTES } from '@constants/routes.const';
import DeleteModal from '@core/components/DeleteModal';
import { Button } from '@core/ui/Button';
import { ModeToggle } from '@core/ui/ModeToggle';
import { Separator } from '@core/ui/Separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@core/ui/Sheet';
import { profilesState } from '@states/profiles.atom';
import { AlignJustify, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import DrawerMenuItems from './DrawerMenuItems';
interface NavbarProps {}

const PortaloLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        priority
        src="/portalo_dark.svg"
        alt="Portalo"
        width={180}
        height={180}
      />
    </div>
  );
};

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
    setResetAccountModalOpen(!resetAccountModalOpen);
  };

  return (
    <>
      <div className="sticky pl-4 top-0 flex w-full justify-between p-3 shadow bg-background">
        <div className="">
          <Link
            href={ROUTES.HOME}
            className="animate-slide-in-left text-xl flex content-center justify-center"
          >
            <PortaloLogo />
          </Link>
        </div>
        <div className="flex my-auto ">
          <Sheet>
            <SheetTrigger asChild>
              <AlignJustify size={32} className="mr-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <PortaloLogo />
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <SheetDescription className="flex flex-col h-full">
                <ModeToggle />
                <div>
                  <DrawerMenuItems />
                </div>
                <div className="flex flex-col justify-center">
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive-foreground border-destructive bg-destructive-foreground hover:border-destructive-foreground hover:bg-destructive ring-destructive"
                    onClick={handleResetAccountModal}
                  >
                    <Trash2 className="mr-2" />
                    {resetAccountLabel}
                  </Button>
                  <div className="mt-4 p-1">
                    <Link
                      href={EXTERNAL_LINKS.NEOPOWER}
                      color="inherit"
                      target="_blank"
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
