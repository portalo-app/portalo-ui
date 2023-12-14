import State from '@core/components/State';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { useState } from 'react';
import AddressCard from './AddressCard';
import AddressDetail from './AddressDetail';

interface AddressListProps {
  profileId: string;
  addressType: ADDRESS_TYPE;
  addresses: CryptoAddress[] | FIATAddress[];
}

type Address = CryptoAddress | FIATAddress;

const AddressList: React.FC<AddressListProps> = ({
  profileId,
  addresses,
  addressType,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const emptyMessage = 'Looks like you don’t have any payment address yet';

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
  };

  return addresses.length === 0 ? (
    <div className="flex justify-center">
      <State label={emptyMessage} type="info" size={100} />
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
        />
      )}
    </>
  );
};

export default AddressList;
