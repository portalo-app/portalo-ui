'use client';

import ShortcutItem from '@components/dashboard/ShortcutItem';
import StoreWidget from '@components/dashboard/StoreWidget';
import PageLayout from '@components/layout/PageLayout';
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
      vault: spaces[0]?.vaults[0],
      icon: spaces[0]?.vaults[0],
    },
    {
      space: spaces[1],
      vault: spaces[1]?.vaults[0],
      icon: spaces[1]?.vaults[0],
    },
  ];

  const spacesTitle = 'Spaces';
  const emptySpacesMessage = "You don't have any spaces yet";

  const shortcutsTitle = 'Shortcuts';
  const emptyShortcutsMessage = "You don't have any shortcuts yet";

  const hasSpaces = spaces?.length > 0;

  return (
    <PageLayout>
      <div className="space-y-4">
        <StoreWidget />

        <div>
          <div className="flex justify-between items-center">
            <TypographyH3>{spacesTitle}</TypographyH3>

            <CreateButton href={ROUTES.APP_CREATE_SPACE} />

            {/* <ResponsiveDialog
              title="Create Space"
              description="Create a new space to organize your vaults"
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
              <State type="info" size={100} label={emptySpacesMessage} />
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
              {shortcuts.map(({ space, vault }, index) => (
                <ShortcutItem key={index} space={space} vault={vault} />
              ))}
            </div>
          ) : (
            <div className="flex content-center justify-center mt-4">
              <State type="info" size={100} label={emptyShortcutsMessage} />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AppPage;
