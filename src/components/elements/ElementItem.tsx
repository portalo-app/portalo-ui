import { Card } from '@core/ui/Card';
import { AddressElement, SocialElement } from '@models/space';

interface ElementItemProps {
  element: AddressElement | SocialElement;
}

const ElementItem: React.FC<ElementItemProps> = ({ element }) => {
  // TODO: Complete the ElementItem component
  return <Card>ElementItem</Card>;
};

export default ElementItem;
