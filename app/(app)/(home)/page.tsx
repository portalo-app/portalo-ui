'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import FolderShortcut from '@components/folders/FolderShortcut';
import ProfileItem from '@components/profiles/ProfileItem';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { TypographyH3 } from '@core/ui/Typography';
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
      <StoreWidget />

      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserRound />
            <TypographyH3>{profilesTitle}</TypographyH3>
          </div>

          {hasProfiles && (
            <CreateButton href={ROUTES.APP_CREATE_PROFILE} title="Add" />
          )}
        </div>

        {hasProfiles ? (
          <div className="divide-y-2 *:block">
            {profiles.map((profile, index) => (
              <ProfileItem profile={profile} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex content-center justify-center mt-4">
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
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layers2 />
            <TypographyH3>{shortcutsTitle}</TypographyH3>
          </div>

          {hasProfiles && (
            <CreateButton href={ROUTES.APP_CREATE_PROFILE} title="Add" />
          )}
        </div>

        {hasProfiles ? (
          <div className="divide-y-2 *:block">
            {shortcuts.map(({ profile, folder }, index) => (
              <FolderShortcut key={index} profile={profile} folder={folder} />
            ))}
          </div>
        ) : (
          <div className="flex content-center justify-center mt-4">
            <State type="empty" label={emptyShortcutsMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppPage;
