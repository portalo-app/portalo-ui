import CreatedByNeoPower from '@core/components/CreatedByNeoPower';
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
              <CreatedByNeoPower />
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
