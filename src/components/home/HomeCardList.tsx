'use client';

import FolderListItem from '@components/folders/FolderListItem';
import ProfileWidget from '@components/profiles/ProfileWidget';
import Recommendations from '@components/profiles/Recommendations';
import { ROUTES } from '@constants/routes.const';
import PlainCard from '@core/components/PlainCard';
import State from '@core/components/State';
import { TypographyH5 } from '@core/ui/Typography';
import useProfile from '@hooks/profiles/useProfile';
import { ShortcutDTO } from '@models/dto/shortcut.dto';
import { profilesState } from '@states/profiles.atom';
import { shortcutsState } from '@states/shortcuts.atom';
import { Layers2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

const HomeCardsList = () => {
  const router = useRouter();

  const profiles = useRecoilValue(profilesState);

  const shortcuts = useRecoilValue(shortcutsState);

  const { getProfileById } = useProfile();

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = 'Your folder shortcuts will be displayed here';

  const hasProfiles = profiles?.length > 0;
  const hasShortcuts = shortcuts.length > 0;

  return (
    <>
      <ProfileWidget />

      <PlainCard
        title={<TypographyH5>{shortcutsTitle}</TypographyH5>}
        titleIcon={<Layers2 />}
        ctaTitle="Add Shortcut"
        ctaIcon={<Plus />}
        onCtaClick={() => router.push(ROUTES.APP_SHORTCUTS)}
        content={
          hasShortcuts ? (
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
          ) : hasProfiles ? (
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
              label="Create a profile to configure shortcuts"
            />
          )
        }
      />

      <Recommendations />
    </>
  );
};

export default HomeCardsList;
