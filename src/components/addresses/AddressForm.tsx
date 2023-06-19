import FormInputAutocomplete from '@/core/components/FormInputAutocomplete';
import FormInputText from '@/core/components/FormInputText';
import useCreateAddress from '@/lib/hooks/addresses/useCreateAddress';
import useEditAddress from '@/lib/hooks/addresses/useEditAddress';
import { CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Entity, banks, chains } from '@/lib/model/entities';
import {
  canPasteFormClipboard,
  pasteFromClipboard,
} from '@/lib/utils/clipboard';
import { ContentPaste } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { FieldError, useForm } from 'react-hook-form';
import EntityIcon from '../entities/EntityIcon';

interface AddressFormProps {
  action: 'CREATE' | 'EDIT';
  profileId: string;
  addressType: 'CRYPTO' | 'FIAT';
  address?: CryptoAddress | FIATAddress;
  onComplete?: () => void;
}

type FormData = {
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
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });
  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();

  const actionLabel = action === 'CREATE' ? 'Create Address' : 'Edit Address';

  const requiredEntityMessage =
    addressType === 'CRYPTO' ? 'Chain is required' : 'Bank is required';

  const nameLabel = 'Name';
  const requiredNameMessage = 'Name is required';
  const maxLengthNameMessage = 'Name is too long';

  const addressLabel = 'Address';
  const requiredAddressMessage = 'Address is required';
  const maxLengthAddressMessage = 'Address is too long';

  const aliasLabel = 'Alias';
  const maxLengthAliasMessage = 'Alias is too long';

  const onSubmit = ({ address, alias, entity, name }: FormData) => {
    if (action === 'EDIT') {
      editAddress(profileId, addressType, {
        id: originalAddress?.id,
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
      <FormInputAutocomplete
        control={control}
        name="entity"
        label={addressType === 'CRYPTO' ? 'Chain' : 'Bank'}
        options={addressType === 'CRYPTO' ? [...chains] : [...banks]}
        defaultValue={action === 'EDIT' ? originalAddress?.entity : undefined}
        iconRenderer={(option) => <EntityIcon entity={option?.value} />}
        error={errors?.entity as FieldError}
        rules={{
          required: { value: true, message: requiredEntityMessage },
        }}
      />

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
              onClick={async () =>
                setValue('address', await pasteFromClipboard())
              }
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
