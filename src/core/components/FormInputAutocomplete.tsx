import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Stack,
  TextField,
} from '@mui/material';
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form';

interface FormInputAutocompleteProps {
  control: Control<any, any>;
  name: string;
  label: string;
  options: any[];
  rules?: RegisterOptions;
  error?: FieldError;
  iconRenderer?: (option: any) => JSX.Element;
  defaultValue?: any;
}

const FormInputAutocomplete: React.FC<FormInputAutocompleteProps> = ({
  control,
  name,
  label,
  options,
  rules,
  error,
  iconRenderer,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue || options[0]}
      render={({ field }) => (
        <Autocomplete
          {...field}
          disablePortal
          fullWidth
          size="small"
          options={options}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) => option.label}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          renderOption={(props, option) => (
            <Stack component="li" direction="row" gap={1} {...props}>
              {iconRenderer && iconRenderer(option)}
              {option.label}
            </Stack>
          )}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              error={!!error?.message}
              helperText={error?.message || ' '}
              label={label}
              placeholder={label}
              InputProps={{
                ...params.InputProps,
                startAdornment: iconRenderer && iconRenderer(field.value),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default FormInputAutocomplete;
