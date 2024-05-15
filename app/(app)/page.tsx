'use client';

import PageLayout from '@components/layout/PageLayout';
import SpaceCard from '@components/spaces/SpaceCard';
import { ROUTES } from '@constants/routes.const';
import State from '@core/components/State';
import { Card } from '@core/ui/Card';
import { TypographyH3 } from '@core/ui/Typography';
import { Space } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const spacesData = useRecoilValue(spacesState);

  const spacesTitle = 'Your Spaces';
  const emptyMessage = "You don't have any spaces yet";
  const createSpaceLabel = '+ Add new';

  useEffect(() => {
    setSpaces(spacesData);
  }, [spacesData]);

  const hasSpaces = spaces?.length > 0;

  return (
    <PageLayout>
      <div className="space-y-4">
        <Card className="h-40 bg-muted">SUMMARY</Card>

        <div>
          <div className="flex justify-between items-center">
            <TypographyH3>{spacesTitle}</TypographyH3>
            <Link className="text-secondary" href={ROUTES.APP_CREATE_SPACE}>
              {createSpaceLabel}
            </Link>
          </div>

          {hasSpaces ? (
            <div className="divide-y-2 *:block">
              {spaces.map((space, index) => (
                <SpaceCard space={space} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex content-center justify-center mt-4">
              <State type="info" size={100} label={emptyMessage} />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AppPage;
