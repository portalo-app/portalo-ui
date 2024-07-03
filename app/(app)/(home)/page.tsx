'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import FolderListItem from '@components/folders/FolderItem';
import ProfileItem from '@components/profiles/ProfileItem';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { TypographyH3 } from '@core/ui/Typography';
import { profilesState } from '@states/profiles.atom';
import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
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

  console.log(shortcuts);

  const profilesTitle = 'Profiles';
  const emptyProfilesMessage = "You don't have any profiles yet";

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = "You don't have any shortcuts yet";

  const hasProfiles = profiles?.length > 0;

  return (
    <div className="space-y-4">
      <StoreWidget />

      <div>
        <div className="flex justify-between items-center">
          <TypographyH3>{profilesTitle}</TypographyH3>

          <CreateButton href={ROUTES.APP_CREATE_PROFILE} />
        </div>

        {hasProfiles ? (
          <div className="divide-y-2 *:block">
            {profiles.map((profile, index) => (
              <ProfileItem profile={profile} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex content-center justify-center mt-4">
            <State type="empty" label={emptyProfilesMessage} />
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center">
          <TypographyH3>{shortcutsTitle}</TypographyH3>
          <CreateButton href={ROUTES.APP_CREATE_PROFILE} />
        </div>

        {hasProfiles ? (
          <div className="divide-y-2 *:block">
            {shortcuts.map(({ profile, folder }, index) => (
              <FolderListItem key={index} profile={profile} folder={folder} />
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
