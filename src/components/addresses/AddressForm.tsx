import { ROUTES } from '@constants/routes.const';
import FormInputText from '@core/components/FormInputText';
import useCreateAddress from '@hooks/addresses/useCreateAddress';
import useEditAddress from '@hooks/addresses/useEditAddress';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { Entity } from '@models/entities';
import { ContentPaste } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { addressFormState } from '@states/address-form.atom';
import { canPasteFormClipboard, pasteFromClipboard } from '@utils/clipboard';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
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

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors, dirtyFields },
  } = useForm<AddressFormData>({ mode: 'all', defaultValues: addressForm });

  const addressValue = watch('address');

  const actionLabel = action === 'CREATE' ? 'Create Address' : 'Edit Address';

  const nameLabel = 'Name';
  const requiredNameMessage = 'Name is required';
  const maxLengthNameMessage = 'Name is too long';

  const addressLabel = 'Address';
  const requiredAddressMessage = 'Address is required';
  const maxLengthAddressMessage = 'Address is too long';

  const aliasLabel = 'Alias';
  const maxLengthAliasMessage = 'Alias is too long';

  useEffect(() => {
    register('address', {
      required: 'Required',
      pattern: {
        value: addressForm.entity?.addressRegex || new RegExp(''),
        message: 'Invalid address',
      },
    });

    if (dirtyFields.address || addressValue) trigger('address');
  }, [addressValue, addressForm.entity, dirtyFields, register, trigger]);

  const handleEntityDelete = () => {
    setAddressForm((currentValue) => ({
      ...currentValue,
      ...watch(),
      entity: undefined,
    }));

    router.push(`${ROUTES.APP_SELECT_ENTITY}/${profileId}/${addressType}`);
  };

  const onSubmit = ({ address, alias, entity, name }: AddressFormData) => {
    if (action === 'EDIT') {
      editAddress(profileId, addressType, {
        id: addressForm.addressId,
        address,
        alias,
        entity,
        name,
      } as CryptoAddress | FIATAddress);
    } else {
      createAddress(profileId, addressType, {
        address,
        alias,
        entity,
        name,
      } as CryptoAddress | FIATAddress);
    }

    onComplete && onComplete();
  };

  // TODO: Update validations
  return (
    <Stack gap={2}>
      {addressForm.entity && (
        <EntityChip entity={addressForm.entity} onClick={handleEntityDelete} />
      )}

      <FormInputText
        control={control}
        name="address"
        label={addressLabel}
        error={errors.address}
        defaultValue={action === 'EDIT' ? originalAddress?.address : undefined}
        rules={{
          required: { value: true, message: requiredAddressMessage },
          maxLength: { value: 100, message: maxLengthAddressMessage },
        }}
        endAdornment={
          canPasteFormClipboard() && (
            <ContentPaste
              cursor="pointer"
              onClick={async () => {
                setValue('address', await pasteFromClipboard(), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          )
        }
      />

      <FormInputText
        control={control}
        name="name"
        label={nameLabel}
        error={errors.name}
        defaultValue={action === 'EDIT' ? originalAddress?.name : undefined}
        rules={{
          required: { value: true, message: requiredNameMessage },
          maxLength: { value: 30, message: maxLengthNameMessage },
        }}
      />

      <FormInputText
        control={control}
        name="alias"
        label={aliasLabel}
        error={errors.alias}
        defaultValue={action === 'EDIT' ? originalAddress?.alias : undefined}
        rules={{
          maxLength: { value: 30, message: maxLengthAliasMessage },
        }}
      />

      <Button
        variant="contained"
        disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(onSubmit)}
      >
        {actionLabel}
      </Button>
    </Stack>
  );
};

export default AddressForm;
