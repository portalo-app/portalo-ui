'use client';

import VaultElementForm from '@components/element/VaultElementForm';
import { ROUTES } from '@constants/routes.const';
import { TypographyH1 } from '@core/ui/Typography';
import { Vault, VaultElement } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface NewElementPageProps {
  params: { vaultId: string; spaceId: string };
}

const NewElementPage: React.FC<NewElementPageProps> = ({ params }) => {
  const { vaultId, spaceId } = params;

  // const [space, setSpace] = useState<Space | null>(null);
  const [vault, setVault] = useState<Vault<VaultElement> | null>(null);
  // const pathName = usePathname();

  const spacesData = useRecoilValue(spacesState);
  const router = useRouter();

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

    // setSpace(selectedSpace);
    setVault(selectedVault);
  }, [spacesData, spaceId, vaultId]);

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1>Add {vaultId}</TypographyH1>

      {vault && (
        <VaultElementForm
          spaceId={spaceId}
          vaultId={vaultId}
          vaultType={vault?.type}
          onComplete={() =>
            router.push(
              `${ROUTES.APP_SPACE}/${spaceId}${ROUTES.APP_VAULT}/${vaultId}`
            )
          }
        />
      )}
    </div>
  );
};

export default NewElementPage;
