import EntityIcon from '@components/entities/EntityIcon';
import { Button } from '@core/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@core/ui/Command';
import { FormControl, FormField, FormItem, FormLabel } from '@core/ui/Form';
import { Popover, PopoverContent, PopoverTrigger } from '@core/ui/PopOver';
import { TypographyP } from '@core/ui/Typography';
import { Entity } from '@models/entities';
import { cn } from '@utils/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

interface EntityFormDesktopProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  nameLabel: string;
  addressPlaceholder: string;
  filteredEntity: Entity[];
}

const EntityFormDesktop: React.FC<EntityFormDesktopProps> = ({
  form,
  nameLabel,
  addressPlaceholder,
  filteredEntity,
}) => {
  return (
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
                          value === field.value ? 'opacity-100' : 'opacity-0'
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
  );
};

export default EntityFormDesktop;
