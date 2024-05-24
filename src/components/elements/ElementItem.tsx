import { Card } from '@core/ui/Card';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import { AddressElement, SocialElement, VaultElement } from '@models/space';
import { Circle } from 'lucide-react';

interface ElementItemProps {
  element: VaultElement;
}

// TODO: Complete the ElementItem component
const ElementItem: React.FC<ElementItemProps> = ({ element }) => {
  const entity = element.entity.label;
  const mainData = (element as SocialElement).username
    ? (element as SocialElement).username
    : (element as AddressElement).address;
  const secondaryData = (element as SocialElement).url
    ? (element as SocialElement).url
    : (element as AddressElement).name;

  return (
    <Card className="relative p-4 space-y-2 border-muted-foreground/20 bg-muted">
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
