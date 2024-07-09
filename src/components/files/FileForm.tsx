import FileVariantEntityIcon from '@components/entities/FileVariantEntityIcon';
import DatapointFormField from '@components/files/form/DatapointFormField';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import AnimatedButton from '@core/ui/AnimatedButton';
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
import { zodResolver } from '@hookform/resolvers/zod';
import useFile from '@hooks/files/useFile';
import {
  FileVariant,
  FileVariantEntity,
} from '@models/business/file/fileVariant';
import { FolderType } from '@models/business/folder/folderType';
import { FileDTO } from '@models/dto/file.dto';
import { cn } from '@utils/utils';
import { Pencil, Plus, SquareMousePointer } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface FileFormProps {
  profileId: string;
  folderId: string;
  folderType: FolderType;
  onComplete: () => void;
  action?: 'new' | 'edit';
  initialData?: FileDTO;
}

const FileForm: React.FC<FileFormProps> = ({
  profileId,
  folderId,
  folderType,
  onComplete,
  action = 'new',
  initialData,
}) => {
  const { generateZodFileSchema, createFile, editFile } = useFile();

  const getCurrentVariant = (): FileVariant | undefined => {
    return folderType.fileType.variants.find(
      (variant) => variant.id === form.getValues().variant
    );
  };

  const getCurrentVariantEntity = (): FileVariantEntity | undefined => {
    return getCurrentVariant()?.availableEntities.find(
      (entity) => entity.id === form.getValues().entity
    );
  };

  const formSchema = generateZodFileSchema(folderType.fileType.datapoints);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: initialData?.data ?? {
      variant: folderType.fileType.variants[0].id,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (action === 'new') {
      createFile(profileId, folderId, data.variant, data.entity, {
        data,
      } as FileDTO);
    } else {
      editFile(profileId, folderId, {
        id: initialData!.id,
        data,
      } as FileDTO);
    }

    form.reset();
    onComplete && onComplete();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-2"
      >
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose a variant</FormLabel>
              <Tabs
                defaultValue={field.value}
                onValueChange={(value: string) => {
                  field.onChange(value);
                  form.setValue('entity', undefined);
                }}
              >
                <FormControl>
                  <TabsList className="w-full border border-muted rounded-full h-10 px-1 bg-muted/25">
                    {folderType.fileType.variants.map((variant) => (
                      <TabsTrigger
                        key={variant.id}
                        value={variant.id}
                        className="flex-1 rounded-full"
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
              <ResponsiveDialog
                title={`Choose a ${getCurrentVariant()?.entityLabel}`}
                trigger={
                  <Card
                    className={cn(
                      'mt-2 p-2 space-y-2 bg-primary/20 border-0 border-muted rounded-full flex justify-center items-center',
                      form.control.getFieldState('entity').error &&
                        'border border-red-900'
                    )}
                  >
                    {getCurrentVariantEntity() ? (
                      <div className="flex gap-2 items-center rounded-full">
                        <FileVariantEntityIcon
                          entity={getCurrentVariantEntity()!}
                        />
                        {getCurrentVariantEntity()?.label}
                      </div>
                    ) : (
                      <span className="flex align-center gap-2">
                        <SquareMousePointer className="text-primary " />
                        Choose a {getCurrentVariant()?.entityLabel}
                      </span>
                    )}
                  </Card>
                }
                closeButtonLabel="Close"
              >
                <div className="grid grid-cols-2 gap-3">
                  {getCurrentVariant()!.availableEntities.map(
                    (variantEntity) => (
                      <DrawerClose key={variantEntity.id}>
                        <Card
                          className={`cursor-pointer border-primary/20 h-24 hover:bg-primary/15
                      `}
                          onClick={() => field.onChange(variantEntity.id)}
                        >
                          <div className="flex flex-col gap-2 justify-center h-full items-center rounded-full ">
                            <FileVariantEntityIcon entity={variantEntity} />
                            {variantEntity.label}
                          </div>
                        </Card>
                      </DrawerClose>
                    )
                  )}
                </div>
              </ResponsiveDialog>
              <FormMessage />
            </FormItem>
          )}
        />

        {[...folderType.fileType.datapoints]
          .filter(
            (dataPoint) =>
              !dataPoint.validations?.some(
                (validation) => validation.type === 'isOptional'
              )
          )
          .sort((a, b) => a.order - b.order)
          .map((datapoint, index) => (
            <DatapointFormField key={index} form={form} datapoint={datapoint} />
          ))}

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
                {[...folderType.fileType.datapoints]
                  .filter((dataPoint) =>
                    dataPoint.validations?.some(
                      (validation) => validation.type === 'isOptional'
                    )
                  )
                  .sort((a, b) => a.order - b.order)
                  .map((datapoint, index) => (
                    <DatapointFormField
                      key={index}
                      form={form}
                      datapoint={datapoint}
                    />
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <></>
        )}

        <AnimatedButton
          type="submit"
          className="uppercase flex gap-1 w-full mt-10"
        >
          {action === 'new' ? (
            <>
              <Plus />
              Create
            </>
          ) : (
            <>
              <Pencil size={18} />
              Save
            </>
          )}
        </AnimatedButton>
      </form>
    </Form>
  );
};

export default FileForm;
