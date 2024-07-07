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
import { profilesState } from '@states/profiles.atom';
import { Layers2, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FunctionComponent, ReactElement } from 'react';
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

      <HomeCard
        title={profilesTitle}
        icon={<UserRound />}
        hasProfiles={hasProfiles}
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

      <HomeCard
        title={shortcutsTitle}
        icon={<Layers2 />}
        hasProfiles={hasProfiles}
        listToShow={
          <>
            {shortcuts.map(({ profile, folder }, index) => (
              <FolderListItem key={index} profile={profile} folder={folder} />
            ))}
          </>
        }
        stateComponent={<State type="empty" label={emptyShortcutsMessage} />}
      />
    </div>
  );
};

const HomeCard: FunctionComponent<{
  title: string;
  icon: ReactElement;
  hasProfiles: boolean;
  listToShow: ReactElement;
  stateComponent: ReactElement;
}> = ({ title, icon, hasProfiles, listToShow, stateComponent }) => (
  <Card className="!mt-10">
    <div className="flex justify-between items-center py-2 px-4 bg-muted rounded-t">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <TypographyH5>{title}</TypographyH5>
      </div>

      {hasProfiles && (
        <CreateButton href={ROUTES.APP_CREATE_PROFILE} title="Add" />
      )}
    </div>

    <Separator className="border-t border-muted/80" />

    {hasProfiles ? (
      <div className="divide-y-2 *:block py-2 px-4">{listToShow}</div>
    ) : (
      <div className="flex content-center justify-center bg-muted rounded-b-xl">
        {stateComponent}
      </div>
    )}
  </Card>
);
export default AppPage;
