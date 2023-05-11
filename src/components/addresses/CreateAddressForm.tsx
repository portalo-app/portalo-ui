import FormInputAutocomplete from '@/core/components/FormInputAutocomplete';
import FormInputText from '@/core/components/FormInputText';
import useCreateAddress from '@/lib/hooks/addresses/useCreateAddress';
import { CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Entity, banks, chains } from '@/lib/model/entities';
import { Button, Stack } from '@mui/material';
import { FieldError, useForm } from 'react-hook-form';
import EntityIcon from '../entities/EntityIcon';

interface CreateAddressFormProps {
  profileId: string;
  addressType: 'CRYPTO' | 'FIAT';
  onCreate?: () => void;
}

type FormData = {
  entity: Entity;
  address: string;
  name: string;
  alias: string;
};

const CreateAddressForm: React.FC<CreateAddressFormProps> = ({
  profileId,
  addressType,
  onCreate,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });
  const createAddress = useCreateAddress();

  const createLabel = 'Create';

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
    createAddress(profileId, addressType, {
      address,
      alias,
      entity,
      name,
    } as CryptoAddress | FIATAddress);

    onCreate && onCreate();
  };

  // TODO: Update validations
  return (
    <Stack gap={2}>
      <FormInputAutocomplete
        control={control}
        name="entity"
        label={addressType === 'CRYPTO' ? 'Chain' : 'Bank'}
        options={addressType === 'CRYPTO' ? [...chains] : [...banks]}
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
        rules={{
          required: { value: true, message: requiredAddressMessage },
          maxLength: { value: 100, message: maxLengthAddressMessage },
        }}
      />

      <FormInputText
        control={control}
        name="name"
        label={nameLabel}
        error={errors.name}
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
        rules={{
          maxLength: { value: 30, message: maxLengthAliasMessage },
        }}
      />

      <Button
        variant="contained"
        disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(onSubmit)}
      >
        {createLabel}
      </Button>
    </Stack>
  );
};

export default CreateAddressForm;
