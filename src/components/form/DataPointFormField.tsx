import { FormField, FormItem, FormLabel, FormMessage } from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface dataPointFormFieldProps {
  form: UseFormReturn;
  label: string;
  placeholder: string;
  dataPointType: string;
}

const DataPointFormField: React.FC<dataPointFormFieldProps> = ({
  form,
  label,
  placeholder,
  dataPointType,
}) => {
  const getInputType = (): HTMLInputTypeAttribute => {
    switch (dataPointType) {
      case 'string':
        return 'text';
      case 'boolean':
        return 'checkbox';
      default:
        return dataPointType;
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="alias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Input
              type={getInputType()}
              {...field}
              placeholder={placeholder}
              value={field.value}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DataPointFormField;
