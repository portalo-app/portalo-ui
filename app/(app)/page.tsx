'use client';

import PageLayout from '@components/layout/PageLayout';
import SpaceCard from '@components/spaces/SpaceCard';
import { ROUTES } from '@constants/routes.const';
import State from '@core/components/State';
import { Button } from '@core/ui/Button';
import { Space } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const spacesData = useRecoilValue(spacesState);
  const router = useRouter();

  const spacesTitle = 'Your Spaces';
  const emptyMessage = "You don't have any spaces yet";
  const createSpaceLabel = '+ Create Space';

  useEffect(() => {
    setSpaces(spacesData);
  }, [spacesData]);

  const hasSpaces = spaces?.length > 0;

  const handleCreateSpace = () => {
    router.push(ROUTES.APP_CREATE_SPACE);
  };

  return (
    <PageLayout title={spacesTitle}>
      {!hasSpaces && (
        <div className="flex content-center justify-center mt-8">
          <State type="info" size={100} label={emptyMessage} />
        </div>
      )}

      {hasSpaces && (
        <div className="divide-y-2 *:block">
          {spaces.map((space, index) => (
            <SpaceCard space={space} key={index} />
          ))}
        </div>
      )}

      <Button
        variant="secondary"
        onClick={handleCreateSpace}
        className="w-full mt-4"
      >
        {createSpaceLabel}
      </Button>
    </PageLayout>
  );
};

export default AppPage;
