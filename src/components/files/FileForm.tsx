import EntityIcon from '@components/entities/EntityIcon';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/ui/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Datapoint, DatapointValidation } from '@models/business/file/fileType';
import { FolderType } from '@models/business/folder/folderType';

import { createMaxErrorMessage, createMinErrorMessage } from '@utils/formUtils';
import React from 'react';
import { SocialIcon } from 'react-custom-social-icons';
import { SocialNetwork } from 'react-custom-social-icons/dist/esm/types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ZodSchema } from 'zod';

interface FileFormProps {
  profileId: string;
  folderId: string;
  folderType: FolderType;
  onComplete: () => void;
  action?: 'new' | 'edit';
  initialData?: any;
}

const FileForm: React.FC<FileFormProps> = ({
  profileId,
  folderId,
  folderType,
  onComplete,
  action = 'new',
  initialData,
}) => {
  // const { createFile, editFile } = useFolderFile();

  console.log('folderType: ', folderType);

  console.log('initialData', initialData);

  const createZodSchema = (datapoints: Datapoint[]): ZodSchema => {
    // Shape are the form fields that will be rendered depending on the datapoints
    const shape: { [key: string]: ZodSchema } = {};

    datapoints.forEach((datapoint: Datapoint) => {
      let shapeField = shape[datapoint.name];

      switch (datapoint.type) {
        case 'string':
          shapeField = z.string();
          break;
        case 'number':
          shapeField = z.number();
          break;
        case 'boolean':
          shapeField = z.boolean();
          break;
        default:
          throw new Error(`Unknown type: ${datapoint.type}`);
      }

      datapoint.validations?.forEach((validation: DatapointValidation) => {
        switch (validation.type) {
          case 'min':
            if (
              shapeField instanceof z.ZodNumber ||
              shapeField instanceof z.ZodString
            ) {
              shapeField = shapeField.min(Number(validation.value), {
                message:
                  validation.errorMessage ??
                  createMinErrorMessage(
                    datapoint.name,
                    Number(validation.value)
                  ),
              });
            }
          case 'max':
            if (
              shapeField instanceof z.ZodNumber ||
              shapeField instanceof z.ZodString
            ) {
              shapeField = shapeField.max(Number(validation.value), {
                message:
                  validation.errorMessage ??
                  createMaxErrorMessage(
                    datapoint.name,
                    Number(validation.value)
                  ),
              });
            }
          case 'isOptional':
            shapeField = shapeField.optional();
        }
      });
    });

    return z.object({
      variant: z.string(),
      entity: z.string().min(1, `Field is required`),
      ...shape,
    });
  };

  console.log(
    'createZodSchema',
    createZodSchema(folderType.fileType.datapoints)
  );

  const formSchema = createZodSchema(folderType.fileType.datapoints);

  // const formSchema = z
  //   .object({
  //     ...{
  //       variant: z.string(),
  //       entity: z.string().min(1, `Field is required`),
  //     },
  //     ...(folderType.id === 'social'
  //       ? { username: z.string() }
  //       : {
  //           address: z
  //             .string()
  //             .min(10, { message: createMinErrorMessage('Address', 10) })
  //             .max(100, { message: createMaxErrorMessage('Address', 100) }),
  //           name: z
  //             .string()
  //             .min(4, { message: createMinErrorMessage('Name', 4) })
  //             .max(30, { message: createMaxErrorMessage('Name', 30) }),

  //           alias: z
  //             .string()
  //             .max(30, { message: createMaxErrorMessage('Alias', 30) })
  //             .optional(),
  //           notes: z
  //             .string()
  //             .max(200, { message: createMaxErrorMessage('Notes', 200) })
  //             .optional(),
  //         }),
  //   })
  //   .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: initialData
      ? { ...initialData, entity: initialData.entity.value }
      : {
          variant: folderType.id,
          entity: '',
          ...(folderType.id === 'social'
            ? {
                username: '',
              }
            : {
                address: '',
                name: '',
                alias: '',
                notes: '',
              }),
        },
  });

  const onSubmit = () => {
    const values = form.getValues();
    console.log(values);
  };

  // const onSubmit = (data: z.infer<typeof formSchema>) => {
  //   if (action === 'new') {
  //     createFile(profileId, folderId, {
  //       ...data,
  //       id: '',
  //       // tags: [],
  //       entity: folderType.variants
  //         .find((variant) => variant.id === data.variant)!
  //         .availableEntities.find((entity) => entity.value === data.entity)!,
  //     } as FolderFile);
  //   } else {
  //     editFile(profileId, folderId, {
  //       ...initialData,
  //       ...data,
  //       // tags: [],
  //       entity: folderType.variants
  //         .find((variant) => variant.id === data.variant)!
  //         .availableEntities.find((entity) => entity.value === data.entity)!,
  //     } as FolderFile);
  //   }

  //   form.reset();

  //   onComplete && onComplete();
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select a ${folderType.label}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {folderType.fileType.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  folderType.fileType.variants.find(
                    (variant) => variant.id === form.getValues().variant
                  )!.entityLabel
                }
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <p>
                    {folderType.fileType.variants
                      .find(
                        (variant) => variant.id === form.getValues().variant
                      )!
                      .availableEntities.map((entity) => (
                        <SelectItem key={entity.value} value={entity.value}>
                          <div className="flex gap-2 items-center rounded-full">
                            {folderType.id === 'social' ? (
                              <SocialIcon
                                network={entity.icon as SocialNetwork}
                                size={20}
                              />
                            ) : (
                              <EntityIcon
                                entity={entity.value}
                                width={4}
                                height={4}
                              />
                            )}
                            {entity.label}
                          </div>
                        </SelectItem>
                      ))}
                  </p>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          // Render the form fields for the selected entity
          // based on the selected folder
          folderType.id === 'social' ? (
            <>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Username"
                      value={field.value as string}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <Input
                      {...field}
                      placeholder="Address"
                      value={field.value as string}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name"
                      {...field}
                      value={field.value as string}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alias</FormLabel>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Alias"
                      value={field.value as string}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Notes"
                      value={field.value as string}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )
        }

        <Button type="submit" className="mt-4 uppercase">
          {action === 'new' ? 'Add' : 'Edit'} {folderType.label}
        </Button>
      </form>
    </Form>
  );
};

export default FileForm;
