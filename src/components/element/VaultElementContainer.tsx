'use client';

import { ROUTES } from '@constants/routes.const';
import { TypographyH1 } from '@core/ui/Typography';
import { Vault, VaultElement } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import VaultElementForm from './VaultElementForm';

interface VaultElementContainerProps {
  spaceId: string;
  vaultId: string;
  elementId?: string;
  action: 'new' | 'edit';
}

const VaultElementContainer: FC<VaultElementContainerProps> = ({
  spaceId,
  vaultId,
  action,
  elementId,
}) => {
  const [vault, setVault] = useState<Vault<VaultElement> | null>(null);
  const [element, setElement] = useState<VaultElement | null>(null);

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

    if (action === 'edit' && elementId) {
      const selectedElement = selectedVault.elements.find(
        (element) => element.id === elementId
      );

      if (!selectedElement) {
        router.push(
          `${ROUTES.APP_SPACE}/${spaceId}${ROUTES.APP_VAULT}/${vaultId}`
        );
        return;
      }

      setElement(selectedElement);
    }

    setVault(selectedVault);
  }, [spacesData, spaceId, vaultId, router, action, elementId]);

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1>
        {action === 'new' ? 'Add' : 'Edit'} {vaultId}
      </TypographyH1>

      {vault && (
        <VaultElementForm
          spaceId={spaceId}
          vaultId={vaultId}
          vaultType={vault?.type}
          initialData={element || undefined}
          onComplete={() =>
            router.push(
              `${ROUTES.APP_SPACE}/${spaceId}${ROUTES.APP_VAULT}/${vaultId}`
            )
          }
          action={action}
        />
      )}
    </div>
  );
};

export default VaultElementContainer;
