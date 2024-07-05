/* eslint-disable @typescript-eslint/no-unused-vars */
import EntityIcon from '@components/entities/EntityIcon';
import DataPointFormField from '@components/form/DataPointFormField';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import { Button } from '@core/ui/Button';
import { Card } from '@core/ui/Card';
import { DrawerClose } from '@core/ui/Drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@core/ui/Form';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { Tabs, TabsList, TabsTrigger } from '@core/ui/Tab';
import { TypographyMuted } from '@core/ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { Datapoint, DatapointValidation } from '@models/business/file/fileType';
import { FileVariantEntity } from '@models/business/file/fileVariant';
import { FolderType } from '@models/business/folder/folderType';

import { createMaxErrorMessage, createMinErrorMessage } from '@utils/formUtils';
import { cn } from '@utils/utils';
import { Pencil, Plus, SquareMousePointer } from 'lucide-react';
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

  const createZodSchema = (datapoints: Datapoint[]): ZodSchema => {
    // Shape are the form fields that will be rendered depending on the datapoints
    const shape: { [key: string]: ZodSchema } = {};

    datapoints.forEach((datapoint: Datapoint) => {
      switch (datapoint.type) {
        case 'string':
          shape[datapoint.name] = z.string();
          break;
        case 'number':
          shape[datapoint.name] = z.number();
          break;
        case 'boolean':
          shape[datapoint.name] = z.boolean();
          break;
        default:
          throw new Error(`Unknown type: ${datapoint.type}`);
      }

      datapoint.validations?.forEach((validation: DatapointValidation) => {
        const shapeField = shape[datapoint.name];
        switch (validation.type) {
          case 'min':
            if (
              shapeField instanceof z.ZodNumber ||
              shapeField instanceof z.ZodString
            ) {
              shape[datapoint.name] = shapeField.min(Number(validation.value), {
                message:
                  validation.errorMessage ??
                  createMinErrorMessage(
                    datapoint.name,
                    Number(validation.value)
                  ),
              });
            }
            break;

          case 'max':
            if (
              shapeField instanceof z.ZodNumber ||
              shapeField instanceof z.ZodString
            ) {
              shape[datapoint.name] = shapeField.max(Number(validation.value), {
                message:
                  validation.errorMessage ??
                  createMaxErrorMessage(
                    datapoint.name,
                    Number(validation.value)
                  ),
              });
            }
            break;

          case 'isOptional':
            shape[datapoint.name] = shapeField.optional();
            break;
        }
      });
    });

    return z.object({
      variant: z.string().min(1, `Field is required`),
      entity: z.string().min(1, `Field is required`),
      ...shape,
    });
  };

  const formSchema = createZodSchema(folderType.fileType.datapoints);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: initialData ?? {
      variant: folderType.fileType.variants[0].id,
    },
  });

  const onSubmit = () => {
    const values = form.getValues();
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-[calc(75vh-2rem)]"
      >
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose a variant</FormLabel>
              <Tabs>
                <FormControl>
                  <TabsList
                    className="w-full border border-muted rounded-full h-10 px-1 bg-muted/25"
                    defaultValue={folderType.fileType.variants[0].id}
                  >
                    {folderType.fileType.variants.map((variant) => (
                      <TabsTrigger
                        key={variant.id}
                        value={variant.id}
                        className="flex-1 rounded-full"
                        onClick={() => {
                          field.onChange(variant.id);
                          form.setValue('entity', '');
                        }}
                      >
                        {variant.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </FormControl>

                <FormMessage />
              </Tabs>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entity"
          render={({ field }) => (
            <FormItem>
              <FormMessage />

              <ResponsiveDialog
                title=""
                trigger={
                  <Card
                    className={cn(
                      'mt-2 relative h-12 space-y-2 border-0 border-muted hover:cursor-pointer hover:bg-primary/10 rounded-full flex justify-center items-center',
                      form.control.getFieldState('entity').error &&
                        'border border-red-900'
                    )}
                  >
                    {folderType.fileType.variants
                      .find(
                        (variant) => variant.id === form.getValues().variant
                      )
                      ?.availableEntities.find(
                        (entity: FileVariantEntity) =>
                          entity.value === field.value
                      ) ? (
                      <div className="flex gap-2 items-center rounded-full">
                        {folderType.id === 'social' ? (
                          <SocialIcon
                            network={field.value as SocialNetwork}
                            size={20}
                          />
                        ) : (
                          <EntityIcon
                            entity={field.value}
                            width={4}
                            height={4}
                          />
                        )}

                        {
                          folderType.fileType.variants
                            .find(
                              (variant) =>
                                variant.id === form.getValues().variant
                            )
                            ?.availableEntities.find(
                              (entity: FileVariantEntity) =>
                                entity.value === field.value
                            )?.label
                        }
                        <TypographyMuted>| {field.value}</TypographyMuted>
                      </div>
                    ) : (
                      <span className="flex align-center gap-2">
                        <SquareMousePointer className="text-primary " />
                        Choose a{' '}
                        {folderType.fileType.variants
                          .find(
                            (variant) => variant.id === form.getValues().variant
                          )
                          ?.entityLabel.toLocaleLowerCase()}
                      </span>
                    )}
                  </Card>
                }
                closeButtonLabel="Close"
              >
                <div className="grid grid-cols-2 gap-3">
                  {folderType.fileType.variants
                    .find((variant) => variant.id === form.getValues().variant)!
                    .availableEntities.map((entity) => (
                      <DrawerClose key={entity.value}>
                        <Card
                          className={`cursor-pointer border-primary/20 h-24 hover:bg-primary/15
                      `}
                          onClick={() => field.onChange(entity.value)}
                        >
                          <div className="flex flex-col gap-2 justify-center h-full items-center rounded-full ">
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
                        </Card>
                      </DrawerClose>
                    ))}
                </div>
              </ResponsiveDialog>
            </FormItem>
          )}
        />

        {
          // folderType.fileType.datapoints
          [...folderType.fileType.datapoints]
            .filter(
              (dataPoint) =>
                !dataPoint.validations?.some(
                  (validation) => validation.type === 'isOptional'
                )
            )
            .sort((a, b) => a.order - b.order)
            .map((dataPoint, index) => (
              <DataPointFormField
                key={index}
                form={form}
                label={dataPoint.name}
                name={dataPoint.name}
                placeholder={dataPoint.placeholder}
                dataPointType={dataPoint.type}
              />
            ))
        }

        {[...folderType.fileType.datapoints].some((dataPoint) =>
          dataPoint.validations?.some(
            (validation) => validation.type === 'isOptional'
          )
        ) ? (
          <Accordion type="single" collapsible>
            <AccordionItem value="item" className="border-0">
              <AccordionTrigger className="text-primary cursor-pointer flex items-center justify-center w-full gap-2">
                Other fields
              </AccordionTrigger>

              <AccordionContent className="py-2 flex flex-col gap-4">
                {
                  // folderType.fileType.datapoints
                  [...folderType.fileType.datapoints]
                    .filter((dataPoint) =>
                      dataPoint.validations?.some(
                        (validation) => validation.type === 'isOptional'
                      )
                    )
                    .sort((a, b) => a.order - b.order)
                    .map((dataPoint, index) => (
                      <DataPointFormField
                        key={index}
                        form={form}
                        name={dataPoint.name}
                        label={dataPoint.name}
                        placeholder={dataPoint.placeholder}
                        dataPointType={dataPoint.type}
                      />
                    ))
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <></>
        )}

        <Button type="submit" className="mt-auto uppercase flex gap-1">
          {action === 'new' ? (
            <>
              <Plus />
              Create
            </>
          ) : (
            <>
              <Pencil size={18} />
              Edit
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FileForm;
