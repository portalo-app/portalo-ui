import EntityIcon from '@components/entities/EntityIcon';
import { Card, CardContent } from '@core/ui/Card';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { CryptoAddress, FIATAddress } from '@models/address';
import { ChevronRight } from 'lucide-react';

interface AddressCardProps {
  addressData: CryptoAddress | FIATAddress;
  onClick?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ addressData, ...props }) => {
  const { alias, address, entity } = addressData;

  return (
    <Card className="hover:cursor-pointer m-2" {...props}>
      <CardContent className="flex justify-between p-2">
        <div className="flex items-center">
          <div className="mr-3">
            <EntityIcon width={50} height={50} entity={entity.value} />
          </div>
          <div>
            <TypographyH4>{alias}</TypographyH4>
            <TypographyMuted>{entity.label || 'Wallet'}</TypographyMuted>
            <TypographyMuted className="text-ellipsis overflow-hidden max-w-44">
              {address}
            </TypographyMuted>
          </div>
        </div>
        <div className="flex items-center ">
          <ChevronRight />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
