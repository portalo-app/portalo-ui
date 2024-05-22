import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@core/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/ui/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADDRESS_TYPE } from '@models/address';
import { VaultType } from '@models/space';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface VaultElementFormProps {
  vaultType: VaultType;
}

const VaultElementForm: React.FC<VaultElementFormProps> = ({ vaultType }) => {
  const formSchema = z
    .object({
      tags: z.string(),
      entity: z.string(),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: 'None',
      entity: '',
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ADDRESS_TYPE.CRYPTO}>Crypto</SelectItem>
                  <SelectItem value={ADDRESS_TYPE.FIAT}>Fiat</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Add a tag to your vault {vaultType.label} element to help you
                identify it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{vaultType.entityLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vaultType.availableEntities.map((entity) => (
                    <SelectItem key={entity.value} value={entity.value}>
                      {entity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the entity of the element
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default VaultElementForm;
