import { Button } from '@/core/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/core/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/core/ui/PopOver';
import { ROUTES } from '@/lib/constants/routes.const';
import { ADDRESS_TYPE } from '@/lib/model/address';
import { Entity, banks, chains } from '@/lib/model/entities';
import { addressFormState } from '@/lib/store/address-form.atom';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import CustomEntityInput from './EntityCustom';
import EntityIcon from './EntityIcon';

interface EntitySelectProps {
  profileId: string;
  addressType: ADDRESS_TYPE;
}

const EntitySelect: FC<EntitySelectProps> = ({ addressType, profileId }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const router = useRouter();
  const [_, setAddressFormState] = useRecoilState(addressFormState);
  const handleEntityClick = (entity: Entity) => {
    setAddressFormState((current) => ({ ...current, entity }));

    router.push(`${ROUTES.APP_CREATE_ADDRESS}/${profileId}/${addressType}`);
  };

  const x = addressType === ADDRESS_TYPE.CRYPTO ? chains : banks;

  // TODO : In this component there should be a tab to select what entity will be used for creating an address.

  return (
    <div>
      <CustomEntityInput
        addressType={addressType}
        onSumbitEntity={handleEntityClick}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-[200px] justify-between">
            {/* // TODO  */}

            {/* {value
              ? x.find((entity) => entity.value === value)?.label
              : 'Select a chain...'} */}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search entity..." />
            <CommandEmpty>No entity found.</CommandEmpty>
            <CommandGroup>
              {x.map((entity) => (
                <CommandItem
                  key={entity.value}
                  value={entity.value}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <EntityIcon entity={entity?.value} width={50} />
                  {entity.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EntitySelect;
