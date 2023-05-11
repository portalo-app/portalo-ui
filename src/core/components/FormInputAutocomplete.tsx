import EntityIcon from '@/components/entities/EntityIcon';
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
}

const FormInputAutocomplete: React.FC<FormInputAutocompleteProps> = ({
  control,
  name,
  label,
  options,
  rules,
  error,
}) => {
  // TODO: Update icon management
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={options[0]}
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
              <EntityIcon entity={option.value} />
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
                startAdornment: <EntityIcon entity={field?.value?.value} />,
              }}
            />
          )}
        />
      )}
    />
  );
};

export default FormInputAutocomplete;
