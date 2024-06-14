'use client';

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
import { spacesState } from '@states/spaces.atom';
import { Menu, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import AppLogo from './AppLogo';
import DrawerMenuItems from './DrawerMenuItems';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const resetSpaces = useResetRecoilState(spacesState);
  const [resetAccountModalOpen, setResetAccountModalOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const resetAccountLabel = 'Reset Account';
  const resetAccountMessage =
    'Are you sure you want to clear the account data? This will remove every Space and all the data associated with them. This action cannot be undone.';

  const createdByNeoPower = 'Created by NeoPower';

  const resetAccount = () => {
    router.push(ROUTES.APP);
    resetSpaces();

    setResetAccountModalOpen(false);
  };

  const handleResetAccountModal = () => {
    setResetAccountModalOpen(!resetAccountModalOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-muted p-2 pl-4">
        <Link href={ROUTES.APP}>
          <AppLogo theme={theme} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <AppLogo theme={theme} />
              </SheetTitle>
            </SheetHeader>

            <Separator />

            <SheetDescription className="flex flex-col min-h-[550px] justify-between">
              <div>
                <DrawerMenuItems />

                <div className="ml-4">
                  <ModeToggle />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <Button variant="destructive" onClick={handleResetAccountModal}>
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
    </>
  );
};

export default Navbar;
