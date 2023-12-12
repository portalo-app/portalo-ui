import { Badge } from '@/core/ui/Badge';
import { Card, CardContent } from '@/core/ui/Card';
import { CryptoAddress, FIATAddress } from '@/lib/model/address';
import { QRCodeSVG } from 'qrcode.react';
import EntityIcon from '../entities/EntityIcon';

interface AddressCardProps {
  addressData: CryptoAddress | FIATAddress;
  showQR?: boolean;
  onClick?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  addressData,
  showQR,
  ...props
}) => {
  const { name, alias, notes, entity, address } = addressData;
  console.log(addressData);
  return (
    <Card
      className={`border bg-background rounded-xl min-w-xl shadow-sm  hover:shadow-primary  hover:border-primary hover:shadow-md hover:cursor-pointer m-2`}
      {...props}
    >
      <CardContent className="py-4">
        <div className="flex content-center space-x-2">
          <EntityIcon
            width="50"
            height="50"
            svgHeight="50"
            svgWidth="50"
            entity={entity.value}
          />

          <h3 className="text-lg font-bold">{entity.label}</h3>

          {alias && <Badge className="bg-primary">{alias}</Badge>}
        </div>

        <h1 className="text-2xl my-1 font-bold">{name || 'Wallet'}</h1>

        <h2>{address}</h2>
        {showQR && (
          <div className=" flex mt-3 content-center">
            <QRCodeSVG
              includeMargin
              value={address}
              size={256}
              style={{ borderRadius: 8 }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
