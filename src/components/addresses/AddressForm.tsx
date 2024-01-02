import { Button } from '@core/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { TypographyMuted, TypographyP } from '@core/ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateAddress from '@hooks/addresses/useCreateAddress';
import useEditAddress from '@hooks/addresses/useEditAddress';
import useEntity from '@hooks/entities/useEntity';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { Entity, banks, chains } from '@models/entities';
import { addressFormState } from '@states/address-form.atom';
import { pasteFromClipboard } from '@utils/clipboard';
import { Bitcoin, Clipboard, Info, Landmark } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import * as z from 'zod';
import EntityForm from './EntityForm';

interface AddressFormProps {
  action: 'CREATE' | 'EDIT';
  profileId: string;
  addressType: ADDRESS_TYPE;
  address?: CryptoAddress | FIATAddress;
  onComplete?: () => void;
  handleDelete?: () => void;
}

const ACTION_FORM = {
  Edit: 'EDIT',
  Create: 'CREATE',
} as const;

export type AddressFormData = {
  entity: Entity;
  address: string;
  alias: string;
};

const AddressForm: React.FC<AddressFormProps> = ({
  action,
  profileId,
  addressType,
  address: originalAddress,
  onComplete,
  handleDelete,
}) => {
  const { getEntity } = useEntity();

  const actionLabel =
    action === ACTION_FORM.Create ? 'Confirm' : 'Confirm changes';
  const deleteActionLabel = 'Delete payment address';
  const aliasLabel = 'Payment Address Alias';
  const optionalLabel = '(optional)';

  const cryptoAddressFormContent = {
    nameLabel: 'Blockchain',
    addressLabel: 'Wallet Address',
    addressPlaceholder: '0x...',
    sheetTitle: 'Select a blockchain from the list',
    namePlaceholder: 'Select a blockchain from the list',
  };

  const fiatAddressFormContent = {
    nameLabel: 'Bank Name',
    addressLabel: 'Payment Address',
    addressPlaceholder: 'Add your CBU/CVU/Alias',
    sheetTitle: 'Select a bank from the list',
    namePlaceholder: "Add your bank's name",
  };

  const addressFormContent =
    addressType === ADDRESS_TYPE.CRYPTO
      ? cryptoAddressFormContent
      : fiatAddressFormContent;

  const {
    nameLabel,
    addressLabel,
    addressPlaceholder,
    sheetTitle,
    namePlaceholder,
  } = addressFormContent;

  const entityType = (
    addressType === ADDRESS_TYPE.CRYPTO ? chains : banks
  ) as Entity[];

  const [entitySelected, setEntitySelected] = useState(namePlaceholder);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [searchEntity, setSearchEntity] = useState('');
  const [filteredEntity, setFilteredEntity] = useState(entityType);
  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();

  const handleFilterEntity = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchEntity(e.target.value);
  };

  useEffect(() => {
    if (searchEntity === '') setFilteredEntity(entityType);

    const filtered = entityType.filter((entity) =>
      entity.label.toLowerCase().includes(searchEntity.toLowerCase())
    );
    setFilteredEntity(filtered);
  }, [searchEntity, entityType]);

  const addressForm = useRecoilValue(addressFormState);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const formSchema = z
    .object({
      entityValue: z.string(),
      address: z.string().min(4).max(100),
      alias: z.string().min(4),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityValue:
        action === ACTION_FORM.Edit
          ? originalAddress?.entity?.value
          : namePlaceholder,
      address: action === ACTION_FORM.Edit ? originalAddress?.address : '',
      alias: action === ACTION_FORM.Edit ? originalAddress?.alias : '',
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const watchEntityValue = watch('entityValue') as Entity['value'];

  useEffect(() => {
    const entity = getEntity(watchEntityValue);
    if (entity) {
      setEntitySelected(entity.label);
    }
  }, [watchEntityValue, getEntity]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { entityValue, address, alias } = data;

    const entity = getEntity(entityValue as Entity['value']);

    if (action === ACTION_FORM.Edit) {
      editAddress(profileId, addressType, {
        id: addressForm.addressId,
        address,
        alias,
        entity,
      } as CryptoAddress | FIATAddress);
    } else {
      createAddress(profileId, addressType, {
        address,
        alias,
        entity,
      } as CryptoAddress | FIATAddress);
    }

    onComplete && onComplete();
  };

  return (
    <div>
      {addressType === ADDRESS_TYPE.CRYPTO ? (
        <div className="p-3 border rounded-xl flex space-x-3 items-center my-6">
          <Bitcoin size={25} />
          <TypographyP>Crypto Account</TypographyP>
        </div>
      ) : (
        <div className="p-3 border rounded-xl flex space-x-3 items-center my-6">
          <Landmark size={25} />
          <TypographyP>Bank Account</TypographyP>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <TypographyP>{aliasLabel}</TypographyP>
                      <TypographyMuted>{optionalLabel}</TypographyMuted>
                    </div>
                    <Info color="grey" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={`${
                        errors.alias &&
                        'bg-destructive/30 border-destructive text-destructive'
                      }`}
                      placeholder="Insert an alias for your payment address"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <EntityForm
              addressPlaceholder={addressPlaceholder}
              sheetTitle={sheetTitle}
              entitySelected={entitySelected}
              handleOpenDrawer={handleOpenDrawer}
              pasteFromClipboard={pasteFromClipboard}
              filteredEntity={filteredEntity}
              nameLabel={nameLabel}
              form={form}
              handleFilterEntity={handleFilterEntity}
              errors={errors}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    {addressLabel}
                    <Info color="grey" />
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder={addressPlaceholder}
                        {...field}
                        className={`${
                          errors.address &&
                          'bg-destructive/30 border-destructive text-destructive'
                        }`}
                      />
                      <Button
                        className="relative z-10 bottom-10 left-28 p-0 bg-transparent hover:border-none hover:bg-transparent"
                        onClick={pasteFromClipboard}
                      >
                        <Clipboard color="grey" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full space-y-2">
            {action === ACTION_FORM.Edit && (
              <Button
                variant={'destructive'}
                className="uppercase"
                onClick={handleDelete}
              >
                {deleteActionLabel}
              </Button>
            )}
            <Button type="submit" className="uppercase">
              {actionLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
