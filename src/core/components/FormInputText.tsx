import { TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form';

interface FormInputTextProps {
  control: Control<any, any>;
  name: string;
  label: string;
  type?: 'text' | 'password';
  defaultValue?: string;
  error?: FieldError;
  rules?: RegisterOptions;
  endAdornment?: React.ReactNode;
}

const FormInputText: React.FC<FormInputTextProps> = ({
  control,
  name,
  label,
  type,
  defaultValue,
  error,
  rules,
  endAdornment,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          autoComplete="off"
          type={type}
          error={!!error?.message}
          helperText={error?.message || ' '}
          label={label}
          InputProps={{ endAdornment: endAdornment }}
        />
      )}
    />
  );
};

export default FormInputText;
