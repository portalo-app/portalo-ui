'use client';

import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';
import { DialogDescription } from '@radix-ui/react-dialog';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Button } from './Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

interface ResponsiveDialogProps {
  title: string;
  closeButtonLabel?: string;
  description?: string;
  trigger?: ReactNode;
  children?: ReactNode;
  isOnboarding?: boolean;
}

const ResponsiveDialog: FC<ResponsiveDialogProps> = ({
  title,
  description,
  trigger,
  children,
  closeButtonLabel,
  isOnboarding,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery(MEDIAQUERY_DESKTOP);

  useEffect(() => {
    if (!trigger && isOnboarding) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger className="w-full">{trigger}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      {trigger && <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        {children && (
          <div className="mb-2 max-h-[80vh] overflow-auto px-4">{children}</div>
        )}

        {closeButtonLabel && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">{closeButtonLabel}</Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
