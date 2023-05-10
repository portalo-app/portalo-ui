import { Stack } from '@mui/material';

interface CreateAddressFormProps {
  addressType: 'CRYPTO' | 'FIAT';
}

const CreateAddressForm: React.FC<CreateAddressFormProps> = ({
  addressType,
}) => {
  return <Stack>TODO: CREATE {addressType} address</Stack>;
};

export default CreateAddressForm;
