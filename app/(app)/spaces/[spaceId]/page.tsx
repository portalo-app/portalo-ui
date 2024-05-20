'use client';

import { ROUTES } from '@constants/routes.const';
import { Card } from '@core/ui/Card';
import { TypographyH3, TypographyH4, TypographyH5 } from '@core/ui/Typography';
import { Space } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { ChevronRight, Wallet } from 'lucide-react';
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

  const createVaultLabel = '+ Add new';

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

        <Link
          className="text-secondary"
          href={`${ROUTES.APP_SPACE}/${spaceId}/${ROUTES.APP_CREATE_VAULT}`}
        >
          {createVaultLabel}
        </Link>
      </div>

      <div className="divide-y-2 *:block space-y-2">
        {space?.vaults.map((vault, index) => (
          <Link
            key={index}
            href={`${ROUTES.APP_SPACE}/${spaceId}/${ROUTES.APP_VAULT}/${vault.id}`}
          >
            <Card className="bg-green-700 text-green-950 py-2 px-4">
              <div className="relative flex gap-2">
                <Wallet size={48} />

                <div>
                  <TypographyH4>{vault.type.label}</TypographyH4>

                  <TypographyH5>
                    {vault.elements.length} {vault.type.id}
                  </TypographyH5>
                </div>

                <ChevronRight
                  size={24}
                  className="absolute top-[calc(50%-12px)] right-2"
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpacePage;
