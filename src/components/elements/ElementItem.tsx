'use client';

import { ROUTES } from '@constants/routes.const';
import { Card } from '@core/ui/Card';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import { AddressElement, SocialElement, VaultElement } from '@models/space';
import { Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

  return (
    <Card
      className="relative p-4 space-y-2 border-muted-foreground/20 bg-muted hover:cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-2">
        <Circle />

        <TypographyMuted>{entity}</TypographyMuted>
      </div>

      <div>
        <TypographyH5>{mainData}</TypographyH5>

        <TypographyMutedXS>{secondaryData}</TypographyMutedXS>
      </div>
    </Card>
  );
};

export default ElementItem;
