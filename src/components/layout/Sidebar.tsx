import { EXTERNAL_LINKS } from '@constants/externalLinks.const';
import { Button } from '@core/ui/Button';
import { ModeToggle } from '@core/ui/ModeToggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@core/ui/Sheet';
import { Separator } from '@radix-ui/react-separator';
import { Menu, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AppLogo from './AppLogo';
import DrawerMenuItems from './DrawerMenuItems';

interface SidebarProps {
  handleResetAccountModal: () => void;
  resetAccountLabel: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleResetAccountModal,
  resetAccountLabel,
}) => {
  const createdByNeoPower = 'Created by NeoPower';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu size={24} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <AppLogo />
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
  );
};

export default Sidebar;
