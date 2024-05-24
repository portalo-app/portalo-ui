'use client';

import ElementItem from '@components/elements/ElementItem';
import VaultTitle from '@components/vaults/VaultTitle';
import { ROUTES } from '@constants/routes.const';
import CreateButton from '@core/components/CreateButton';
import { Space, Vault, VaultElement } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface VaultDetailsProps {
  params: { vaultId: string; spaceId: string };
}

const VaultDetail: NextPage<VaultDetailsProps> = ({ params }) => {
  const [space, setSpace] = useState<Space | null>(null);
  const [vault, setVault] = useState<Vault<VaultElement> | null>(null);
  const pathName = usePathname();

  const spacesData = useRecoilValue(spacesState);
  const { vaultId, spaceId } = params;

  useEffect(() => {
    if (!spaceId) return;

    const selectedSpace = spacesData.find((space) => space.id === spaceId);
    const selectedVault = selectedSpace?.vaults.find(
      (vault) => vault.id === vaultId
    );

    if (!selectedSpace || !selectedVault) {
      router.push(ROUTES.APP);
      return;
    }

    setSpace(selectedSpace);
    setVault(selectedVault);
  }, [spacesData, spaceId, vaultId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <VaultTitle space={space!} vault={vault!} />

        <CreateButton href={`${pathName}/new`} />
      </div>

      <div>VARIANT FILTER</div>

      <div className="space-y-4">
        {vault?.elements.map((element, index) => (
          <ElementItem
            key={index}
            element={element}
            spaceId={spaceId}
            vaultId={vaultId}
          />
        ))}
      </div>
    </div>
  );
};

export default VaultDetail;
