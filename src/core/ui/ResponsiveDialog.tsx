'use client';

import * as React from 'react';

import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';
import { DialogDescription } from '@radix-ui/react-dialog';
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
  description?: string;
  trigger: React.ReactNode;
  children?: React.ReactNode;
  closeButtonLabel: string;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  title,
  description,
  trigger,
  children,
  closeButtonLabel,
}) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery(MEDIAQUERY_DESKTOP);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">{trigger}</DialogTrigger>

        <DialogContent className="max-h-[70vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
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
      <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        {children && (
          <div className="mb-2 max-h-[70vh] overflow-auto px-4">{children}</div>
        )}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{closeButtonLabel}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
