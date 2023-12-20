'use client';

import { ROUTES } from '@constants/routes.const';
import { addressFormState } from '@states/address-form.atom';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Button } from '@core/ui/Button';
import { Label } from "@core/ui/Label";
import { RadioGroup, RadioGroupItem } from "@core/ui/RadioGroup";
import { Bitcoin, Landmark } from 'lucide-react';

interface EntitySelectProps {
  profileId: string;
}

const EntitySelect: FC<EntitySelectProps> = ({ profileId }) => {
  const [addressType, setAddressType] = useState<string>('FIAT');

  const router = useRouter();
  const setAddressFormState = useSetRecoilState(addressFormState);


  const handleEntityClick = () => {
    setAddressFormState((current) => ({ ...current }));

    router.push(`${ROUTES.APP_CREATE_ADDRESS}/${profileId}/${addressType}`);
  };

  const handleValueChange = (value: string) => {
    setAddressType(value);
  }

  return (
    <div className='mt-10 flex flex-col justify-between content-end min-h-full'>
      <RadioGroup defaultValue={addressType} onValueChange={handleValueChange}>
        <div className="flex items-center space-x-2 border-2 p-4 rounded-xl justify-between">
          <div className='flex items-center'>
            <Landmark size={40} />
            <Label htmlFor="FIAT" className='pl-4'>Bank Account</Label>
          </div>
          <RadioGroupItem value="FIAT" id="FIAT" />
        </div>
        <div className="flex items-center space-x-2 border-2 p-4 rounded-xl justify-between">
          <div className='flex items-center'>
            <Bitcoin size={40} />
            <Label htmlFor="CRYPTO" className='pl-4'>Crypto Account</Label>
          </div>
          <RadioGroupItem value="CRYPTO" id="CRYPTO" />
        </div>
      </RadioGroup>
      <Button className="w-full rounded-3xl text-foreground" onClick={handleEntityClick}>Continue</Button>
    </div>
  );
};

export default EntitySelect;
