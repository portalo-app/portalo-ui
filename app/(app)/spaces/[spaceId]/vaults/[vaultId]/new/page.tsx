'use client';

import VaultElementContainer from '@components/element/VaultElementContainer';

interface NewElementPageProps {
  params: { vaultId: string; spaceId: string };
}

const NewElementPage: React.FC<NewElementPageProps> = ({ params }) => {
  const { vaultId, spaceId } = params;

  return (
    <VaultElementContainer spaceId={spaceId} vaultId={vaultId} action="new" />
  );
};

export default NewElementPage;
