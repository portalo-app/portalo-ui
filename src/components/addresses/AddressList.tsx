import { Button } from '@core/ui/Button';
import { TypographyP } from '@core/ui/Typography';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { Search } from 'lucide-react';
import { useState } from 'react';
import AddressCard from './AddressCard';
import AddressDetail from './AddressDetail';

interface AddressListProps {
  profileId: string;
  addressType: ADDRESS_TYPE;
  addresses: CryptoAddress[] | FIATAddress[];
  onClick: () => void;
}

type Address = CryptoAddress | FIATAddress;

const AddressList: React.FC<AddressListProps> = ({
  profileId,
  addresses,
  addressType,
  onClick,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyMessage = 'Looks like you don’t have any payment address yet';

  const createAddressTitle = 'Add Payment address';

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
    setIsDialogOpen(!isDialogOpen);
  };

  return addresses.length === 0 ? (
    <div className="border rounded-xl p-4">
      <div className="flex space-x-3">
        <Search size={60} className="pb-2" />
        <TypographyP>{emptyMessage}</TypographyP>
      </div>
      <Button onClick={onClick} className="uppercase">
        {createAddressTitle}
      </Button>
    </div>
  ) : (
    <>
      <div>
        {addresses.map((address, index) => (
          <div key={index}>
            <AddressCard
              addressData={address}
              onClick={() => handleAddressClick(address)}
            />
          </div>
        ))}
      </div>

      {selectedAddress && (
        <AddressDetail
          profileId={profileId}
          addressType={addressType}
          address={selectedAddress}
          onComplete={() => setSelectedAddress(null)}
          handleOpenDialog={handleOpenDialog}
          isDialogOpen={isDialogOpen}
        />
      )}
    </>
  );
};

export default AddressList;
