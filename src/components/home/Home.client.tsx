'use client';

import FolderListItem from '@components/folders/FolderListItem';
import ProfileItem from '@components/profiles/ProfileItem';
import { ROUTES } from '@constants/routes.const';
import HomeCard from '@core/components/HomeCard';
import State from '@core/components/State';
import useProfile from '@hooks/profiles/useProfile';
import { ShortcutDTO } from '@models/dto/shortcut.dto';
import { profilesState } from '@states/profiles.atom';
import { shortcutsState } from '@states/shortcuts.atom';
import { Layers2, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

const HomeClientContainer = () => {
  const router = useRouter();

  const profiles = useRecoilValue(profilesState);

  const shortcuts = useRecoilValue(shortcutsState);

  const { getProfileById } = useProfile();

  const profilesTitle = 'Profiles';
  const emptyProfilesMessage = 'Create a Profile to get started!';

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = 'Your folder shortcuts will be displayed here';

  const hasProfiles = profiles?.length > 0;
  const hasShortcuts = shortcuts.length > 0;

  return (
    <>
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

      <HomeCard
        title={shortcutsTitle}
        icon={<Layers2 />}
        hasData={hasShortcuts}
        href={ROUTES.APP_SHORTCUTS}
        listToShow={
          <>
            {shortcuts.map(({ folderId, profileId }: ShortcutDTO) => (
              <FolderListItem
                key={profileId + folderId}
                profileName={getProfileById(profileId)?.name}
                folderTypeId={folderId}
                profileId={profileId}
              />
            ))}
          </>
        }
        stateComponent={
          hasProfiles ? (
            <State
              type="empty"
              label={emptyShortcutsMessage}
              action={{
                label: '+ Create Shortcut',
                onClick: () => router.push(ROUTES.APP_SHORTCUTS),
              }}
            />
          ) : (
            <State
              type="empty"
              label="You should create a profile before configuring shortcuts!"
            />
          )
        }
      />
    </>
  );
};

export default HomeClientContainer;
