import AnimatedModal from '@/core/components/AnimatedModal';
import DeleteModal from '@/core/components/DeleteModal';
import State from '@/core/components/State';
import useDeleteAddress from '@/lib/hooks/addresses/useDeleteAddress';
import { AddressType, CryptoAddress, FIATAddress } from '@/lib/model/address';
import { Stack } from '@mui/material';
import { useState } from 'react';
import AddressCard from './AddressCard';
import AddressMenu from './AddressMenu';

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
  const [showingQR, setShowingQR] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAddress = useDeleteAddress();

  const emptyMessage = 'No addresses found';
  const deleteMessage = 'Are you sure you want to delete this address?';
  const deleteTitle = 'Delete Address';

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleMenuClose = () => {
    setSelectedAddress(null);
  };

  const handleAddressDelete = () => {
    if (!selectedAddress) return;

    deleteAddress(profileId, selectedAddress.id, addressType);
    setIsDeleting(false);
    handleMenuClose();
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

      {isDeleting && (
        <DeleteModal
          open={isDeleting}
          onClose={() => setIsDeleting(false)}
          title={deleteTitle}
          message={deleteMessage}
          onDelete={handleAddressDelete}
        />
      )}

      {!isDeleting && (
        <AnimatedModal
          open={Boolean(selectedAddress)}
          onClose={handleMenuClose}
        >
          {selectedAddress && (
            <AddressCard
              addressData={selectedAddress}
              showQR={showingQR}
              inModal
            />
          )}

          {selectedAddress && (
            <AddressMenu
              selectedAddress={selectedAddress}
              handleQR={() => setShowingQR(!showingQR)}
              handleDelete={() => setIsDeleting(true)}
              handleEdit={() => {}}
            />
          )}
        </AnimatedModal>
      )}
    </>
  );
};

export default AddressList;
