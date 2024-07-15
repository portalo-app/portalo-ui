'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import FolderListItem from '@components/folders/FolderListItem';
import ProfileItem from '@components/profiles/ProfileItem';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { Button } from '@core/ui/Button';
import { Card } from '@core/ui/Card';
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { Separator } from '@core/ui/Separator';
import { TypographyH5 } from '@core/ui/Typography';
import { ShortcutDTO } from '@models/dto/shortcut.dto';
import { profilesState } from '@states/profiles.atom';
import { shortcutsState } from '@states/shortcuts.atom';
import { Layers2, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FunctionComponent, ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const router = useRouter();

  const profiles = useRecoilValue(profilesState);

  const getShortcuts = useRecoilValue(shortcutsState);

  const getShortcutFolders = () => {
    if (getShortcuts.length === 0) return [];

    const shortcutsArray = getShortcuts.flatMap((shortcut: ShortcutDTO) => {
      const matchingProfile = profiles.find(
        (profile) => profile.id === shortcut.profile
      );
      if (!matchingProfile || shortcut.folders.length === 0) {
        return [];
      }

      return shortcut.folders.flatMap((shortcutId: string) => {
        const matchingFolder = matchingProfile.folders.find(
          (folder) => folder.id === shortcutId
        );
        if (!matchingFolder) {
          return [];
        }

        return [
          {
            profile: matchingProfile,
            folder: matchingFolder,
          },
        ];
      });
    });

    return shortcutsArray;
  };

  const shortcuts = getShortcutFolders();

  const profilesTitle = 'Profiles';
  const emptyProfilesMessage = 'Create a Profile to get started!';

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = 'Your folder shortcuts will be displayed here';

  const hasProfiles = profiles?.length > 0;
  const hasShortcuts = shortcuts.length > 0;

  return (
    <div className="space-y-4">
      <ResponsiveDialog
        title="Coming soon"
        description="✨ Soon you'll be able to store ANYTHING ANYWHERE ✨"
        trigger={<StoreWidget />}
      >
        <div className="space-y-4 flex flex-col justify-center">
          <Input disabled placeholder="Input Anything!" />
          <Button disabled>Store Anywhere</Button>
        </div>
      </ResponsiveDialog>

      {/*  profiles */}
      <HomeCard
        title={profilesTitle}
        icon={<UserRound />}
        href={ROUTES.APP_CREATE_PROFILE}
        hasData={hasProfiles}
        listToShow={
          <>
            {profiles.map((profile, index) => (
              <ProfileItem profile={profile} key={index} />
            ))}
          </>
        }
        stateComponent={
          <State
            type="empty"
            label={emptyProfilesMessage}
            action={{
              label: '+ Create Profile',
              onClick: () => router.push(ROUTES.APP_CREATE_PROFILE),
            }}
          />
        }
      />

      {/* shortcuts */}
      <HomeCard
        title={shortcutsTitle}
        icon={<Layers2 />}
        hasData={hasShortcuts}
        href={ROUTES.APP_SHORTCUTS}
        listToShow={
          <>
            {shortcuts.map(({ profile, folder }: any) => (
              <FolderListItem
                key={profile.id}
                profile={profile}
                folder={folder}
              />
            ))}
          </>
        }
        stateComponent={
          <State
            type="empty"
            label={emptyShortcutsMessage}
            action={{
              label: '+ Create Shortcut',
              onClick: () => router.push(ROUTES.APP_SHORTCUTS),
            }}
          />
        }
      />
    </div>
  );
};

const HomeCard: FunctionComponent<{
  title: string;
  icon: ReactElement;
  hasData: boolean;
  listToShow: ReactElement;
  stateComponent: ReactElement;
  href: string;
}> = ({ title, icon, hasData, listToShow, stateComponent, href }) => (
  <Card className="!mt-10">
    <div className="flex justify-between items-center py-2 px-4 bg-muted rounded-t">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <TypographyH5>{title}</TypographyH5>
      </div>

      {hasData && <CreateButton href={href} title="Add" />}
    </div>

    <Separator className="border-t border-muted/80" />

    {hasData ? (
      <div className="divide-y-2 *:block py-2 px-4">{listToShow}</div>
    ) : (
      <div className="flex content-center justify-center bg-muted rounded-b-xl">
        {stateComponent}
      </div>
    )}
  </Card>
);

export default AppPage;
