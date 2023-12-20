import { Button } from '@core/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/ui/Select";
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateAddress from '@hooks/addresses/useCreateAddress';
import useEditAddress from '@hooks/addresses/useEditAddress';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { Entity, banks, chains } from '@models/entities';
import { addressFormState } from '@states/address-form.atom';
import { Bitcoin, Info, Landmark } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import * as z from 'zod';



interface AddressFormProps {
  action: 'CREATE' | 'EDIT';
  profileId: string;
  addressType: ADDRESS_TYPE;
  address?: CryptoAddress | FIATAddress;
  onComplete?: () => void;
}

const ACTION_FORM = {
  Edit: 'EDIT',
  Create: 'CREATE',
} as const;

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
  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();


  const entityType = addressType === ADDRESS_TYPE.CRYPTO ? chains : banks;


  const addressForm = useRecoilValue(addressFormState);

  const actionLabel = action === 'CREATE' ? 'Confirm' : 'Edit Address';

  const nameLabel = addressType === 'CRYPTO' ? 'Blockchain' : 'Bank Name';
  const addressLabel = addressType === 'CRYPTO' ? 'Wallet Address' : 'Payment Address';
  const aliasLabel = 'Payment Address Alias';
  const optionalLabel = '(optional)'

  // const namePlaceholder = addressType === 'CRYPTO' ? "Select a blockchain from the list" : "Add your bank's name"
  const addressPlaceholder = addressType === 'CRYPTO' ? "0x..." : 'Add your CBU/CVU/Alias'

  // TODO Validate if we can delete this
  // const handleEntityDelete = () => {
  //   setAddressForm((currentValue) => ({
  //     ...currentValue,
  //     entity: undefined,
  //   }));

  //   router.push(`${ROUTES.APP_SELECT_ENTITY}/${profileId}/${addressType}`);
  // };

  const formSchema = z
    .object({
      name: z.string({ required_error: "Please select an email to display.", }),
      address: z.string().min(4).max(100),
      alias: z.string().min(4),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: action === ACTION_FORM.Edit ? originalAddress?.name : '',
      address: action === ACTION_FORM.Edit ? originalAddress?.address : '',
      alias: action === ACTION_FORM.Edit ? originalAddress?.alias : '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { name, address, alias } = data;
    console.log('data', data)
    console.log('addressForm', addressForm)
    console.log('type', entityType)
    if (action === ACTION_FORM.Edit) {
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
      {/* {addressForm.entity && <EntityChip entity={addressForm.entity} />} */}
      {
        addressType === 'CRYPTO'
          ?
          <div className='p-3 border rounded-xl flex space-x-3 items-center my-6'>
            <Bitcoin size={25} />
            <p>
              Crypto Account
            </p>
          </div>
          :
          <div className='p-3 border rounded-xl flex space-x-3 items-center my-6' >
            <Landmark size={25} />
            <p>
              Bank Account
            </p>
          </div>
      }


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-20"
        >
          <div className='flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-between items-center'>
                    <div className='flex'>
                      <p>{aliasLabel}</p>
                      <p>{optionalLabel}</p>
                    </div>
                    <Info color='grey' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert an alias for your payment address"
                      {...field}
                      className=" focus:border-primary ring-primary w-full rounded-3xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{nameLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={namePlaceholder}
                      {...field}
                      className="focus:border-primary ring-primary w-full rounded-3xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{nameLabel}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-3xl">
                        <SelectValue placeholder="Blockchain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      <SelectGroup  >
                        {entityType.map((element, idx) => (
                          <SelectItem value={element.value} key={idx}>
                            <p>{element.label}</p>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-between items-center'>{addressLabel}
                    <Info color='grey' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={addressPlaceholder}
                      {...field}
                      className=" focus:border-primary ring-primary w-full rounded-3xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="rounded-3xl uppercase text-foreground">
            {actionLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
