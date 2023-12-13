import { Button } from '@core/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { Separator } from '@core/ui/Separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADDRESS_TYPE } from '@models/address';
import { Entity } from '@models/entities';
import { ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import EntityIcon from './EntityIcon';

interface CustomEntityForm {
  entityName: string;
}

const CustomEntityInput: FC<{
  addressType: ADDRESS_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSumbitEntity: (entity: Entity) => void;
}> = ({ addressType, onSumbitEntity }) => {
  const [entityValue, entityType] =
    addressType === ADDRESS_TYPE.FIAT
      ? ['DEFAULT_BANK' as Entity['value'], 'Bank']
      : ['DEFAULT_CHAIN' as Entity['value'], 'Chain'];

  const formSchema = z
    .object({
      entityName: z.string().min(3).max(20),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityName: '',
    },
  });

  const onSubmit = ({ entityName }: CustomEntityForm) => {
    onSumbitEntity({
      label: entityName,
      value: entityValue,
      color: 'grey',
      icon: entityValue,
    });
  };

  return (
    <>
      <div className="flex content-center">
        <EntityIcon entity={entityValue} width={50} />
        <div className="pt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="entityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Other ${entityType}`}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="entity name"
                        {...field}
                        className=" focus:border-primary ring-primary w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-primary">
                <ChevronRight />
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default CustomEntityInput;
