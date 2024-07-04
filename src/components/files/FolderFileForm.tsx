import EntityIcon from '@components/entities/EntityIcon';
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
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { Tabs, TabsList, TabsTrigger } from '@core/ui/Tab';
import { TypographyMuted } from '@core/ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import useFolderFile from '@hooks/files/useFolderFile';
import { Entity, FolderFile, FolderType } from '@models/profile';
import { createMaxErrorMessage, createMinErrorMessage } from '@utils/formUtils';
import { Pencil, Plus, SquareMousePointer } from 'lucide-react';
import React from 'react';
import { SocialIcon } from 'react-custom-social-icons';
import { SocialNetwork } from 'react-custom-social-icons/dist/esm/types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface FolderFileFormProps {
  profileId: string;
  folderId: string;
  folderType: FolderType;
  onComplete: () => void;
  action?: 'new' | 'edit';
  initialData?: FolderFile;
}

const FolderFileForm: React.FC<FolderFileFormProps> = ({
  profileId,
  folderId,
  folderType,
  onComplete,
  action = 'new',
  initialData,
}) => {
  const { createFile, editFile } = useFolderFile();

  const formSchema = z
    .object({
      ...{
        variant: z.string(),
        entity: z.string().min(1, `Field is required`),
      },
      ...(folderType.id === 'social'
        ? { username: z.string() }
        : {
            address: z
              .string()
              .min(10, { message: createMinErrorMessage('Address', 10) })
              .max(100, { message: createMaxErrorMessage('Address', 100) }),
            name: z
              .string()
              .min(4, { message: createMinErrorMessage('Name', 4) })
              .max(30, { message: createMaxErrorMessage('Name', 30) }),

            alias: z
              .string()
              .max(30, { message: createMaxErrorMessage('Alias', 30) })
              .optional(),
            notes: z
              .string()
              .max(200, { message: createMaxErrorMessage('Notes', 200) })
              .optional(),
          }),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: initialData
      ? { ...initialData, entity: initialData.entity.value }
      : {
          variant: folderType.variants[0].id,
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (action === 'new') {
      createFile(profileId, folderId, {
        ...data,
        id: '',
        tags: [],
        entity: folderType.variants
          .find((variant) => variant.id === data.variant)!
          .availableEntities.find((entity) => entity.value === data.entity)!,
      } as FolderFile);
    } else {
      editFile(profileId, folderId, {
        ...initialData,
        ...data,
        tags: [],
        entity: folderType.variants
          .find((variant) => variant.id === data.variant)!
          .availableEntities.find((entity) => entity.value === data.entity)!,
      } as FolderFile);
    }

    form.reset();

    onComplete && onComplete();
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
                    defaultValue={field.value}
                  >
                    {folderType.variants.map((variant) => (
                      <TabsTrigger
                        key={variant.id}
                        value={variant.id}
                        className="flex-1 rounded-full"
                        onClick={() => {
                          field.onChange(variant.id);
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
              <ResponsiveDialog
                title=""
                trigger={
                  <Card className="mt-2 relative h-12 space-y-2 border-0 border-muted hover:cursor-pointer hover:bg-primary/10 rounded-full flex justify-center items-center">
                    {folderType.variants
                      .find(
                        (variant) => variant.id === form.getValues().variant
                      )
                      ?.availableEntities.find(
                        (entity: Entity) => entity.value === field.value
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
                          folderType.variants
                            .find(
                              (variant) =>
                                variant.id === form.getValues().variant
                            )
                            ?.availableEntities.find(
                              (entity: Entity) => entity.value === field.value
                            )?.label
                        }
                        <TypographyMuted>| {field.value}</TypographyMuted>
                      </div>
                    ) : (
                      <span className="flex align-center gap-2">
                        <SquareMousePointer className="text-primary " />
                        Choose a{' '}
                        {folderType.variants
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
                  {folderType.variants
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
                      placeholder="john_doe"
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
                      placeholder="0x123..."
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
                    <FormLabel>
                      Name{' '}
                      <span className="text-sm text-gray-500">(optional)</span>
                    </FormLabel>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      value={field.value as string}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible>
                <AccordionItem value="item" className="border-0">
                  <AccordionTrigger className="text-primary cursor-pointer flex items-center justify-center w-full gap-2">
                    Other fields
                  </AccordionTrigger>

                  <AccordionContent className="py-2 flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="alias"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Alias{' '}
                            <span className="text-sm text-gray-500">
                              (optional)
                            </span>
                          </FormLabel>
                          <Input
                            type="text"
                            {...field}
                            placeholder="johndoe123"
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
                          <FormLabel>
                            Notes{' '}
                            <span className="text-sm text-gray-500">
                              (optional)
                            </span>
                          </FormLabel>
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )
        }

        <Button type="submit" className="mt-auto uppercase flex gap-1 ">
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

export default FolderFileForm;
