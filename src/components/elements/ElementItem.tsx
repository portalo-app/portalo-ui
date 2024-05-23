import { Card } from '@core/ui/Card';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import { AddressElement, SocialElement } from '@models/space';
import { Circle } from 'lucide-react';

interface ElementItemProps {
  element: AddressElement | SocialElement;
}

// TODO: Complete the ElementItem component
const ElementItem: React.FC<ElementItemProps> = ({}) => {
  // TODO: Add mapping logic to convert from the element prop to the elementData object
  const { entity, mainData, secondaryData } = {
    entity: 'Entity Name', // 'Entity Name
    mainData: 'Name',
    secondaryData: '0x123456789123456',
  };

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
