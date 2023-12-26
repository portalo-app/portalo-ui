import { Card, CardContent } from '@core/ui/Card';
import { CryptoAddress, FIATAddress } from '@models/address';
import { ChevronRight } from 'lucide-react';

interface AddressCardProps {
  addressData: CryptoAddress | FIATAddress;
  onClick?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  addressData,
  ...props
}) => {
  const { name, alias, address } = addressData; //entity 
  return (
    <Card className="hover:cursor-pointer m-2" {...props}>
      <CardContent className="flex justify-between p-2">
        <div className='flex'>
          <div className="flex items-center mr-3">
            {/* <EntityIcon width={50} height={50} entity={name} /> */}
          </div>
          <div>
            <p className="font-bold text-xl">{alias}</p>
            <h1>{name || 'Wallet'}</h1>
            <h2 className='text-ellipsis overflow-hidden max-w-44'>{address}</h2>
          </div>
        </div>
        <div className='flex items-center '>
          <ChevronRight />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
