import { Badge } from '@core/ui/Badge';
import { Card, CardContent } from '@core/ui/Card';
import { CryptoAddress, FIATAddress } from '@models/address';
import { QRCodeSVG } from 'qrcode.react';

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
  const { name, alias, address } = addressData; //entity 
  return (
    <Card className="min-w-xl  hover:cursor-pointer m-2" {...props}>
      <CardContent className="py-4">
        <div className="flex content-center space-x-2">
          {/* <EntityIcon width={50} height={50} entity={entity.value} /> */}

          {/* <h3 className="text-lg font-bold">{entity.label}</h3> */}

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
