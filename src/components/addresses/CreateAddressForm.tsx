import FormInputAutocomplete from '@/core/components/FormInputAutocomplete';
import FormInputText from '@/core/components/FormInputText';
import { Entity, chains } from '@/lib/model/entities';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

interface CreateAddressFormProps {
  addressType: 'CRYPTO' | 'FIAT';
}

type FormData = {
  entity: Entity;
  address: string;
  name: string;
  alias: string;
};

const CreateAddressForm: React.FC<CreateAddressFormProps> = ({
  addressType,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });

  const createLabel = 'Create';

  const requiredChainMessage = 'Chain is required';

  const nameLabel = 'Name';
  const requiredNameMessage = 'Name is required';
  const maxLengthNameMessage = 'Name is too long';

  const addressLabel = 'Address';
  const requiredAddressMessage = 'Address is required';
  const maxLengthAddressMessage = 'Address is too long';

  const aliasLabel = 'Alias';
  const requiredAliasMessage = 'Alias is required';
  const maxLengthAliasMessage = 'Alias is too long';

  const onSubmit = ({ address, alias, entity, name }: FormData) => {
    // TODO: Create address

    console.log({ address, alias, chain: entity.value, name });
  };

  // TODO: Update validations
  return (
    <Stack gap={2}>
      <FormInputAutocomplete
        control={control}
        name="entity"
        label="Chain"
        options={[...chains]}
        error={errors?.entity?.value}
        rules={{
          required: { value: true, message: requiredChainMessage },
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
        name="address"
        label={addressLabel}
        error={errors.address}
        rules={{
          required: { value: true, message: requiredAddressMessage },
          maxLength: { value: 30, message: maxLengthAddressMessage },
        }}
      />

      <FormInputText
        control={control}
        name="alias"
        label={aliasLabel}
        error={errors.alias}
        rules={{
          required: { value: true, message: requiredAliasMessage },
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
