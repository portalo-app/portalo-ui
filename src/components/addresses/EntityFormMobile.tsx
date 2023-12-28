import EntityIcon from '@components/entities/EntityIcon';
import { Button } from '@core/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@core/ui/Drawer';
import { FormField, FormItem } from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { Label } from '@core/ui/Label';
import { RadioGroup, RadioGroupItem } from '@core/ui/RadioGroup';
import { ScrollArea } from '@core/ui/ScrollArea';
import { Entity } from '@models/entities';
import { ChevronDown, Search } from 'lucide-react';
import { ChangeEvent } from 'react';
import { FieldErrors } from 'react-hook-form/dist/types';

interface EntityFormMobileProps {
  sheetTitle: string;
  entitySelected: string;
  handleOpenDrawer: () => void;
  pasteFromClipboard: () => void;
  filteredEntity: Entity[];
  nameLabel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  handleFilterEntity: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors;
}

const EntityFormMobile: React.FC<EntityFormMobileProps> = ({
  sheetTitle,
  entitySelected,
  handleOpenDrawer,
  pasteFromClipboard,
  filteredEntity,
  nameLabel,
  form,
  handleFilterEntity,
  errors,
}) => {
  return (
    <div>
      <div>
        <Label>{nameLabel}</Label>
        {/* <div className="relative bottom-8 left-64" >
                <Clipboard color='grey' />
              </div> */}
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={`bg-background border border-primary text-foreground flex justify-between mt-2 ${
              errors.entityValue &&
              'bg-destructive/30 border-destructive text-destructive'
            }`}
            onClick={handleOpenDrawer}
          >
            {entitySelected}
            <ChevronDown />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-lg p-2">
          <DrawerHeader className="flex items-start">
            <DrawerTitle>{sheetTitle}</DrawerTitle>
          </DrawerHeader>
          <div className="mt-5">
            <Input
              placeholder="Search"
              className="pl-10"
              onChange={handleFilterEntity}
            />
            <Button
              className="relative bottom-10 right-46 p-0 bg-transparent hover:bg-transparent hover:border-none w-10"
              onClick={pasteFromClipboard}
            >
              <Search color="grey" />
            </Button>
            <ScrollArea className="h-[200px]">
              <FormField
                control={form.control}
                name="entityValue"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {filteredEntity.map(({ value, label }, idx) => (
                        <div
                          className="flex justify-between w-full p-1 items-center hover:cursor-pointer hover:bg-primary-foreground"
                          key={idx}
                        >
                          <div className="flex items-center space-x-4">
                            <EntityIcon entity={value} width={50} height={50} />
                            <Label htmlFor={label}>{label}</Label>
                          </div>
                          <RadioGroupItem value={value} id={label} />
                        </div>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </ScrollArea>
            <DrawerClose className="w-full" asChild>
              <Button onClick={handleOpenDrawer} className="mt-4">
                Continue
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EntityFormMobile;
