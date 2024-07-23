'use client';

import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { Checkbox } from '@core/ui/Checkbox';
import { Form, FormControl, FormField, FormItem } from '@core/ui/Form';
import Icon from '@core/ui/Icon';
import { Separator } from '@core/ui/Separator';
import { TypographyH3, TypographyH4, TypographyP } from '@core/ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import useFolderType from '@hooks/useFolderType';
import { ShortcutDTO } from '@models/dto/shortcut.dto';
import { profilesState } from '@states/profiles.atom';
import { shortcutsState } from '@states/shortcuts.atom';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import z from 'zod';

const Shortcuts = () => {
  const profiles = useRecoilValue(profilesState);
  const [shortcuts, setShortcuts] = useRecoilState(shortcutsState);

  const router = useRouter();

  const { getFolderIcon } = useFolderType();

  const hasProfiles = profiles.length > 0;

  !hasProfiles && router.replace(ROUTES.APP);

  const FormSchema = z.object({
    shortcuts: z.array(
      z.object({
        profileId: z.string(),
        folderId: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shortcuts: shortcuts,
    },
  });

  const sortShortcuts = (shortcuts: ShortcutDTO[]) => {
    return shortcuts.sort((a, b) => a.profileId.localeCompare(b.profileId));
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setShortcuts(sortShortcuts(data.shortcuts));

    router.push(ROUTES.APP);
  };

  const handleCheckboxChange = (
    profileId: string,
    folderId: string,
    checked: boolean,
    field: ControllerRenderProps<FieldValues, 'shortcuts'>
  ) => {
    // add the new shortcut if checked, remove the shortcut if unchecked
    const updatedShortcuts = checked
      ? [...field.value, { profileId, folderId }]
      : field.value.filter(
          (shortcut: ShortcutDTO) =>
            !(
              shortcut.profileId === profileId && shortcut.folderId === folderId
            )
        );

    field.onChange(updatedShortcuts);
  };

  return (
    <>
      <div className="space-y-2">
        <TypographyH3>Choose your Shortcuts</TypographyH3>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-8 !mt-8"
          >
            <FormItem className="space-y-4">
              {profiles.map((profile) => (
                <div key={profile.id} className="bg-muted p-4 rounded-lg">
                  <TypographyH4 className="pb-2">{profile.name}</TypographyH4>
                  <div>
                    {profile.folders.map((folder) => (
                      <FormField
                        key={folder.id}
                        name="shortcuts"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={folder.id}
                              className="flex items-center pl-4 gap-2 mt-1"
                            >
                              <FormControl>
                                <Checkbox
                                  className="w-7 h-7"
                                  id={folder.id}
                                  checked={
                                    !!field.value?.find(
                                      (shortcut: ShortcutDTO) =>
                                        shortcut.profileId === profile.id &&
                                        shortcut.folderId === folder.id
                                    )
                                  }
                                  onCheckedChange={(checked: boolean) => {
                                    handleCheckboxChange(
                                      profile.id,
                                      folder.id,
                                      checked,
                                      field
                                    );
                                  }}
                                />
                              </FormControl>
                              <Icon
                                name={getFolderIcon(folder.id)}
                                className="!mt-0 brightness-90"
                                size={24}
                              />
                              <TypographyP className="capitalize !mt-0 brightness-90">
                                {folder.folderTypeId}
                              </TypographyP>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </FormItem>

            <div className="flex justify-center pt-10">
              <Button className="w-full" type="submit">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Shortcuts;
