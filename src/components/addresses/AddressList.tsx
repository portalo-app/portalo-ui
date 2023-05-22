import State from '@/core/components/State';
import { AddressType, CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Fade, Stack } from '@mui/material';
import { useState } from 'react';
import AddressCard from './AddressCard';
import AddressDetail from './AddressDetail';

interface AddressListProps {
  profileId: string;
  addressType: AddressType;
  addresses: CryptoAddress[] | FIATAddress[];
}

type Address = CryptoAddress | FIATAddress;

const AddressList: React.FC<AddressListProps> = ({
  profileId,
  addresses,
  addressType,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const emptyMessage = 'No addresses found';

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
  };

  return addresses.length === 0 ? (
    <State label={emptyMessage} type="info" />
  ) : (
    <>
      <Stack gap={2}>
        {addresses.map((address, index) => (
          <Fade key={index} in timeout={{ enter: 200 * (index + 1) }}>
            <div>
              <AddressCard
                addressData={address}
                onClick={() => handleAddressClick(address)}
              />
            </div>
          </Fade>
        ))}
      </Stack>

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
