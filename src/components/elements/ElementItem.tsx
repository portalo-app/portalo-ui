'use client';

import { ROUTES } from '@constants/routes.const';
import DeleteModal from '@core/components/DeleteModal';
import { Card } from '@core/ui/Card';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import useVaultElement from '@hooks/element/useVaultElement';
import { AddressElement, SocialElement, VaultElement } from '@models/space';
import { Circle, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

interface ElementItemProps {
  spaceId: string;
  vaultId: string;
  element: VaultElement;
}

// TODO: Complete the ElementItem component
const ElementItem: React.FC<ElementItemProps> = ({
  element,
  spaceId,
  vaultId,
}) => {
  const router = useRouter();
  const { deleteElement } = useVaultElement();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const entity = element.entity.label;
  const mainData = (element as SocialElement).username
    ? (element as SocialElement).username
    : (element as AddressElement).address;
  const secondaryData = (element as SocialElement).url
    ? (element as SocialElement).url
    : (element as AddressElement).name;

  const handleCardClick = () => {
    router.push(
      `${ROUTES.APP_SPACE}/${spaceId}${ROUTES.APP_VAULT}/${vaultId}/edit/${element.id}`
    );
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <DeleteModal
        message="Are you sure you want to delete this element?"
        onDelete={() => (
          deleteElement(spaceId, vaultId, element.id),
          setIsDeleteModalOpen(false)
        )}
        onClose={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
        title="Delete Element"
      />
      <Card
        className="relative p-4 space-y-2 border-muted-foreground/20 bg-muted hover:cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2 w-100">
          <Circle />

          <TypographyMuted>{entity}</TypographyMuted>

          <TrashIcon
            className="w-4 h-4 ml-auto mr-1 hover:text-red-600"
            onClick={handleDelete}
          />
        </div>

        <div>
          <TypographyH5>{mainData}</TypographyH5>

          <TypographyMutedXS>{secondaryData}</TypographyMutedXS>
        </div>
      </Card>
    </>
  );
};

export default ElementItem;
