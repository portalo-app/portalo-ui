import VaultElementContainer from '@components/elements/VaultElementContainer';

interface EditElementPageProps {
  params: { vaultId: string; spaceId: string; elementId: string };
}

const NewElementPage: React.FC<EditElementPageProps> = ({ params }) => {
  const { vaultId, spaceId, elementId } = params;

  return (
    <VaultElementContainer
      spaceId={spaceId}
      vaultId={vaultId}
      elementId={elementId}
      action="edit"
    />
  );
};

export default NewElementPage;
