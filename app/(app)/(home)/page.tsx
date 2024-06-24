'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import FolderItem from '@components/folders/FolderItem';
import SpaceItem from '@components/spaces/SpaceItem';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import State from '@core/components/State';
import { TypographyH3 } from '@core/ui/Typography';
import { spacesState } from '@states/spaces.atom';
import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const spaces = useRecoilValue(spacesState);

  const shortcuts = [
    {
      space: spaces[0],
      folder: spaces[0]?.folders[0],
      icon: spaces[0]?.folders[0],
    },
    {
      space: spaces[0],
      folder: spaces[0]?.folders[1],
      icon: spaces[0]?.folders[1],
    },
  ];

  const spacesTitle = 'Spaces';
  const emptySpacesMessage = "You don't have any spaces yet";

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = "You don't have any shortcuts yet";

  const hasSpaces = spaces?.length > 0;

  return (
    <div className="space-y-4">
      <StoreWidget />

      <div>
        <div className="flex justify-between items-center">
          <TypographyH3>{spacesTitle}</TypographyH3>

          <CreateButton href={ROUTES.APP_CREATE_SPACE} />

          {/* <ResponsiveDialog
              title="Create Space"
              description="Create a new space to organize your folders"
              trigger={<div>Create</div>}
              closeButtonLabel="Close"
            >
              <SpaceForm
                action="CREATE"
                onComplete={() => router.push(ROUTES.APP)}
              />
            </ResponsiveDialog> */}
        </div>

        {hasSpaces ? (
          <div className="divide-y-2 *:block">
            {spaces.map((space, index) => (
              <SpaceItem space={space} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex content-center justify-center mt-4">
            <State type="empty" label={emptySpacesMessage} />
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center">
          <TypographyH3>{shortcutsTitle}</TypographyH3>
          <CreateButton href={ROUTES.APP_CREATE_SPACE} />
        </div>

        {hasSpaces ? (
          <div className="divide-y-2 *:block">
            {shortcuts.map(({ space, folder }, index) => (
              <FolderItem key={index} space={space} folder={folder} />
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
