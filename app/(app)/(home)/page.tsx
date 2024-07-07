'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import FolderListItem from '@components/folders/FolderItem';
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
import { profilesState } from '@states/profiles.atom';
import { Layers2, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const router = useRouter();
  const profiles = useRecoilValue(profilesState);

  const shortcuts = [
    {
      profile: profiles[0],
      folder: profiles[0]?.folders[0],
      icon: profiles[0]?.folders[0],
    },
    {
      profile: profiles[0],
      folder: profiles[0]?.folders[1],
      icon: profiles[0]?.folders[1],
    },
  ];

  const profilesTitle = 'Profiles';
  const emptyProfilesMessage = 'Create a Profile to get started!';

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = 'Your folder shortcuts will be displayed here';

  const hasProfiles = profiles?.length > 0;

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

      <Card className="!mt-10">
        <div className="flex justify-between items-center py-2 px-4 bg-muted rounded-t">
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserRound />
            <TypographyH5>{profilesTitle}</TypographyH5>
          </div>

          {hasProfiles && <CreateButton href={ROUTES.APP_CREATE_PROFILE} />}
        </div>

        <Separator className="border-t border-muted/80" />

        {hasProfiles ? (
          <div className="divide-y-2 *:block py-2 px-4">
            {profiles.map((profile, index) => (
              <ProfileItem profile={profile} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex content-center justify-center bg-muted rounded-b-xl">
            <State
              type="empty"
              label={emptyProfilesMessage}
              action={{
                label: '+ Create Profile',
                onClick: () => router.push(ROUTES.APP_CREATE_PROFILE),
              }}
            />
          </div>
        )}
      </Card>

      <Card>
        <div className="flex justify-between items-center py-2 px-4 bg-muted rounded-t">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers2 />
            <TypographyH5>{shortcutsTitle}</TypographyH5>
          </div>

          {hasProfiles && <CreateButton href={'#'} disabled />}
        </div>

        <Separator className="border-t border-muted" />

        {hasProfiles ? (
          <div className="divide-y-2 *:block py-2 px-4">
            {shortcuts.map(({ profile, folder }, index) => (
              <FolderListItem key={index} profile={profile} folder={folder} />
            ))}
          </div>
        ) : (
          <div className="flex content-center justify-center bg-muted rounded-b-xl">
            <State type="empty" label={emptyShortcutsMessage} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default AppPage;
