import AnimatedModal from '@/core/components/AnimatedModal';
import State from '@/core/components/State';
import { CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Stack } from '@mui/material';
import { useState } from 'react';
import AddressCard from './AddressCard';
import AddressMenu from './AddressMenu';

interface AddressListProps {
  addresses: CryptoAddress[] | FIATAddress[];
}

type Address = CryptoAddress | FIATAddress;

const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const emptyMessage = 'No addresses found';

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleMenuClose = () => {
    setSelectedAddress(null);
  };

  return addresses.length === 0 ? (
    <State label={emptyMessage} type="info" />
  ) : (
    <>
      <Stack gap={2}>
        {addresses.map((address, index) => (
          <AddressCard
            key={index}
            addressData={address}
            onClick={() => handleAddressClick(address)}
          />
        ))}
      </Stack>

      <AnimatedModal open={Boolean(selectedAddress)} onClose={handleMenuClose}>
        {selectedAddress && <AddressCard addressData={selectedAddress} />}

        {selectedAddress && <AddressMenu selectedAddress={selectedAddress} />}
      </AnimatedModal>
    </>
  );
};

export default AddressList;
