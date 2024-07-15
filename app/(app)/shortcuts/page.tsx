'use client';

import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { Checkbox } from '@core/ui/Checkbox';
import { Form, FormControl, FormField, FormItem } from '@core/ui/Form';
import Icon, { IconType } from '@core/ui/Icon';
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

  const hasProfiles = profiles.length > 0;

  const { getFolderIcon } = useFolderType();

  const FormSchema = z.object({
    profiles: z
      .array(
        z.object({
          profile: z.string(),
          folders: z.array(z.string()),
        })
      )
      .nonempty(),
  });

  const findShortcutProfile = (profileId: string): string[] => {
    const shortcut = shortcuts.find(
      (shortcut: ShortcutDTO) => shortcut.profile === profileId
    );

    return shortcut ? shortcut.folders : [];
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profiles: profiles.map((profile) => ({
        profile: profile.id,
        folders: findShortcutProfile(profile.id),
      })),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setShortcuts(data.profiles);
    router.push(ROUTES.APP);
  };

  const handleCheckboxChange = (
    profileId: string,
    folderId: string,
    checked: string | boolean,
    field: ControllerRenderProps<FieldValues, 'profiles'>
  ) => {
    const updatedProfiles = field.value.map((item: ShortcutDTO) => {
      if (item.profile === profileId) {
        return {
          ...item,
          folders: checked
            ? [...item.folders, folderId]
            : item.folders.filter((folder: string) => {
                return folder !== folderId;
              }),
        };
      }
      return item;
    });
    field.onChange(updatedProfiles);
  };

  const getIconFolder = (folderTypeId: string): IconType => {
    const icon = getFolderIcon(folderTypeId);

    return icon;
  };

  return (
    <>
      <div className="space-y-2">
        <TypographyH3>Choose your Shortcuts</TypographyH3>

        <Separator />

        {hasProfiles ? (
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
                          name="profiles"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={folder.id}
                                className="flex items-center pl-4 gap-2 mt-1"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="w-6 h-6"
                                    id={folder.id}
                                    checked={field.value
                                      ?.find(
                                        (field: any) =>
                                          field.profile === profile.id
                                      )
                                      .folders?.includes(folder.id)}
                                    onCheckedChange={(checked) => {
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
                                  name={getIconFolder(folder.id)}
                                  className="!mt-0"
                                  size={20}
                                />
                                <TypographyP className="capitalize !mt-0">
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
        ) : (
          <div className="p-1 !mt-8 ">
            <TypographyP className="text-center">
              You should have a profile before you create a shortcut!
            </TypographyP>
            <Button
              className="w-full mt-4"
              onClick={() => router.push(ROUTES.APP_CREATE_PROFILE)}
            >
              + Create a profile
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Shortcuts;
