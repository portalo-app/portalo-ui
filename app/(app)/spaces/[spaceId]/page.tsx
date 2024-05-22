'use client';

import ShortcutItem from '@components/dashboard/ShortcutItem';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import { TypographyH3 } from '@core/ui/Typography';
import { Space } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { ChevronRight } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface SpacePageProps {
  params: { spaceId: string };
}

const SpacePage: NextPage<SpacePageProps> = ({ params }) => {
  const [space, setSpace] = useState<Space | null>(null);
  const spacesData = useRecoilValue(spacesState);
  const { spaceId } = params;
  const router = useRouter();

  useEffect(() => {
    if (!spaceId) return;

    const selectedSpace = spacesData.find((space) => space.id === spaceId);

    if (!selectedSpace) {
      router.push(ROUTES.APP);
      return;
    }

    setSpace(selectedSpace);
  }, [spacesData, router, spaceId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH3>{space?.name}</TypographyH3>

        <CreateButton
          href={`${ROUTES.APP_SPACE}/${spaceId}/${ROUTES.APP_CREATE_VAULT}`}
        />
      </div>

      <div className="divide-y-2 *:block space-y-2">
        {space?.vaults.map((vault, index) => (
          <Link
            className="relative"
            key={index}
            href={`${ROUTES.APP_SPACE}/${spaceId}/${ROUTES.APP_VAULT}/${vault.id}`}
          >
            <ShortcutItem space={space} vault={vault} />

            <ChevronRight
              size={24}
              className="absolute top-[calc(50%-12px)] right-2"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpacePage;
