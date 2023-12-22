import EntityIcon from '@components/entities/EntityIcon';
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
import { Label } from "@core/ui/Label";
import { RadioGroup, RadioGroupItem } from "@core/ui/RadioGroup";
import { ScrollArea } from "@core/ui/ScrollArea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@core/ui/Sheet";
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateAddress from '@hooks/addresses/useCreateAddress';
import useEditAddress from '@hooks/addresses/useEditAddress';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { Entity, banks, chains } from '@models/entities';
import { addressFormState } from '@states/address-form.atom';
import { pasteFromClipboard } from '@utils/clipboard';
import { Bitcoin, Clipboard, Info, Landmark, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const namePlaceholder = addressType === 'CRYPTO' ? "Select a blockchain from the list" : "Add your bank's name"

  const actionLabel = action === 'CREATE' ? 'Confirm' : 'Edit Address';

  const nameLabel = addressType === 'CRYPTO' ? 'Blockchain' : 'Bank Name';
  const addressLabel = addressType === 'CRYPTO' ? 'Wallet Address' : 'Payment Address';
  const aliasLabel = 'Payment Address Alias';
  const optionalLabel = '(optional)'

  const addressPlaceholder = addressType === 'CRYPTO' ? "0x..." : 'Add your CBU/CVU/Alias'
  const sheetTitle = addressType === 'CRYPTO' ? 'Select a blockchain from the list' : 'Select a bank from the list';


  const entityType = addressType === ADDRESS_TYPE.CRYPTO ? chains : banks;

  const [openSheet, setOpenSheet] = useState<boolean>(false)
  const [searchEntity, setSearchEntity] = useState('')
  const [filteredEntity, setFilteredEntity] = useState(entityType)
  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();

  const handleFilterEntity = (e) => {
    setSearchEntity(e.target.value)
  }

  useEffect(() => {
    if (searchEntity === '') setFilteredEntity(entityType)

    const filtered = entityType.filter(
      (el) => el.label.toLowerCase().includes(searchEntity.toLowerCase())
    );
    console.log(filtered)
    setFilteredEntity(filtered)
  }, [searchEntity, entityType])


  const addressForm = useRecoilValue(addressFormState);

  // TODO Validate if we can delete this
  // const handleEntityDelete = () => {
  //   setAddressForm((currentValue) => ({
  //     ...currentValue,
  //     entity: undefined,
  //   }));

  //   router.push(`${ROUTES.APP_SELECT_ENTITY}/${profileId}/${addressType}`);
  // };

  const handleOpenSheet = () => {
    setOpenSheet(!openSheet)
  }

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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label>{nameLabel}</Label>
              <Input placeholder={namePlaceholder} onClick={handleOpenSheet} />
              {/* <div className="relative bottom-8 left-64" >
                <Clipboard color='grey' />
              </div> */}
            </div>
            <Sheet open={openSheet} onOpenChange={handleOpenSheet}>
              <SheetContent side="bottom" className='h-3/4 rounded-t-lg'>

                <SheetHeader className='flex items-start'>
                  <SheetTitle>{sheetTitle}</SheetTitle>
                </SheetHeader>
                <div className='mt-5'>
                  <Input placeholder='Search' className='pl-10' onChange={handleFilterEntity} />
                  <Button className="relative bottom-10 left-3 p-0 bg-transparent" onClick={pasteFromClipboard}>
                    <Search color="grey" />
                  </Button>
                  <ScrollArea className='h-[200px]'>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            {filteredEntity.map((element, idx) => (
                              <div className="flex justify-between w-full p-1 items-center" key={idx}>
                                <div className="flex items-center space-x-4">
                                  <EntityIcon entity={element.value} width={50} height={50} />
                                  <Label htmlFor={element.label}>{element.label}</Label>
                                </div>
                                <RadioGroupItem value={element.value} id={element.value} />
                              </div>
                            ))}
                          </RadioGroup>
                        </FormItem>
                      )}
                    />
                  </ScrollArea>
                  <Button onClick={handleOpenSheet} className='w-full mt-10'>Continue</Button>
                </div>
              </SheetContent>
            </Sheet>


            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-between items-center'>{addressLabel}
                    <Info color='grey' />
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder={addressPlaceholder}
                        {...field}
                      />
                      <Button className="relative z-10 bottom-10 left-64 p-0 bg-transparent" onClick={pasteFromClipboard}>
                        <Clipboard color='grey' />
                      </Button>
                    </div>
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
    </div >
  );
};

export default AddressForm;
