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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const emptyMessage = 'No addresses found';

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    address: Address
  ) => {
    setSelectedAddress(address);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return addresses.length === 0 ? (
    <State label={emptyMessage} type="info" />
  ) : (
    <Stack gap={2}>
      {addresses.map((address, index) => (
        <AddressCard
          key={index}
          addressData={address}
          onClick={(event) => handleClick(event, address)}
          style={{
            zIndex: selectedAddress === address ? 1301 : 0,
            position: selectedAddress === address ? 'relative' : undefined,
          }}
        />
      ))}

      {Boolean(selectedAddress) && (
        <AddressMenu anchorEl={anchorEl} handleClose={handleClose} />
      )}
    </Stack>
  );
};

export default AddressList;
