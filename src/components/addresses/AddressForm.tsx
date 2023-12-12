import { Button } from '@/core/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/ui/Form';
import { Input } from '@/core/ui/Input';
import { ROUTES } from '@/lib/constants/routes.const';
import useCreateAddress from '@/lib/hooks/addresses/useCreateAddress';
import useEditAddress from '@/lib/hooks/addresses/useEditAddress';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Entity } from '@/lib/model/entities';
import { addressFormState } from '@/lib/store/address-form.atom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as z from 'zod';
import EntityChip from '../entities/EntityChip';

interface AddressFormProps {
  action: 'CREATE' | 'EDIT';
  profileId: string;
  addressType: ADDRESS_TYPE;
  address?: CryptoAddress | FIATAddress;
  onComplete?: () => void;
}

export type AddressFormData = {
  entity: Entity;
  address: string;
  name: string;
  alias: string;
};

const AddressForm: React.FC<AddressFormProps> = ({
  action,
  profileId,
  addressType,
  address: originalAddress,
  onComplete,
}) => {
  const router = useRouter();

  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();

  const [addressForm, setAddressForm] = useRecoilState(addressFormState);

  const actionLabel = action === 'CREATE' ? 'Create Address' : 'Edit Address';

  const nameLabel = 'Name';
  const addressLabel = 'Address';
  const aliasLabel = 'Alias';

  const handleEntityDelete = () => {
    setAddressForm((currentValue) => ({
      ...currentValue,
      entity: undefined,
    }));

    router.push(`${ROUTES.APP_SELECT_ENTITY}/${profileId}/${addressType}`);
  };

  const formSchema = z
    .object({
      name: z.string().min(4).max(50),
      address: z.string().min(4).max(100),
      alias: z.string().min(4),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: action === 'EDIT' ? originalAddress?.name : '',
      address: action === 'EDIT' ? originalAddress?.address : '',
      alias: action === 'EDIT' ? originalAddress?.alias : '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { name, address, alias } = data;
    if (action === 'EDIT') {
      editAddress(profileId, addressType, {
        id: addressForm.addressId,
        address,
        alias,
        entity: addressForm.entity,
        name,
      } as CryptoAddress | FIATAddress);
    } else {
      createAddress(profileId, addressType, {
        address,
        alias,
        entity: addressForm.entity,
        name,
      } as CryptoAddress | FIATAddress);
    }

    onComplete && onComplete();
  };

  return (
    <div className="p-2">
      {addressForm.entity && <EntityChip entity={addressForm.entity} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    className=" focus:border-primary ring-primary w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{addressLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="address"
                    {...field}
                    className=" focus:border-primary ring-primary w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{aliasLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="alias"
                    {...field}
                    className=" focus:border-primary ring-primary w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2 w-[250px]">
            {actionLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
