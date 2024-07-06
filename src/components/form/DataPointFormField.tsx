import { FormField, FormItem, FormLabel, FormMessage } from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { Datapoint } from '@models/business/file/datapoint/datapoint';
import { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface dataPointFormFieldProps {
  form: UseFormReturn;
  datapoint: Datapoint;
}

const DataPointFormField: React.FC<dataPointFormFieldProps> = ({
  form,
  datapoint: { id, name, placeholder, type },
}) => {
  const getInputType = (): HTMLInputTypeAttribute => {
    switch (type) {
      case 'string':
        return 'text';
      case 'boolean':
        return 'checkbox';
      default:
        return type;
    }
  };

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <Input
            type={getInputType()}
            {...field}
            placeholder={placeholder}
            value={field.value || ''}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DataPointFormField;
