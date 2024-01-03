import EntityIcon from '@components/entities/EntityIcon';
import { Button } from '@core/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@core/ui/Command';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@core/ui/Drawer';
import { FormControl, FormField, FormItem, FormLabel } from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { Label } from '@core/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@core/ui/PopOver';
import { RadioGroup, RadioGroupItem } from '@core/ui/RadioGroup';
import { ScrollArea } from '@core/ui/ScrollArea';
import { TypographyP } from '@core/ui/Typography';
import { Entity, EntityValue } from '@models/entities';
import { cn } from '@utils/utils';
import { Check, ChevronDown, ChevronsUpDown, Search } from 'lucide-react';
import { ChangeEvent } from 'react';
import { FieldErrors, UseFormReturn } from 'react-hook-form/dist/types';

interface EntityFormProps {
  sheetTitle: string;
  entitySelected: string;
  handleOpenDrawer: () => void;
  pasteFromClipboard: () => void;
  filteredEntity: Entity[];
  nameLabel: string;
  form: UseFormReturn<{
    address: string;
    entityValue: (typeof EntityValue)[number];
    alias: string;
  }>;
  handleFilterEntity: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors;
  addressPlaceholder: string;
}

const EntityForm: React.FC<EntityFormProps> = ({
  sheetTitle,
  entitySelected,
  handleOpenDrawer,
  pasteFromClipboard,
  filteredEntity,
  nameLabel,
  form,
  handleFilterEntity,
  errors,
  addressPlaceholder,
}) => {
  return (
    <div>
      <div className="md:hidden">
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
                              <EntityIcon
                                entity={value}
                                width={50}
                                height={50}
                              />
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
      <div className="hidden md:block">
        <FormField
          control={form.control}
          name="entityValue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{nameLabel}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? filteredEntity.find(
                            (entity) => entity.value === field.value
                          )?.label
                        : addressPlaceholder}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search entity..."
                      className="w-full"
                    />
                    <CommandEmpty>No entity found.</CommandEmpty>
                    <CommandGroup>
                      {filteredEntity.map(({ value, label }, index) => (
                        <CommandItem
                          value={label}
                          key={index}
                          onSelect={() => {
                            form.setValue('entityValue', value);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          <EntityIcon entity={value} width={30} height={30} />
                          <TypographyP className="ml-2">{label}</TypographyP>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EntityForm;
