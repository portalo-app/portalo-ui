import AnimatedModal from '@/core/components/AnimatedModal';
import DeleteModal from '@/core/components/DeleteModal';
import useDeleteAddress from '@/lib/hooks/addresses/useDeleteAddress';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@/lib/model/address';
import { addressFormState } from '@/lib/store/address-form.atom';
import { Paper } from '@mui/material';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import PageLayout from '../layout/PageLayout';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import AddressMenu from './AddressMenu';

interface AddressDetailProps {
  profileId: string;
  addressType: ADDRESS_TYPE;
  address: CryptoAddress | FIATAddress;
  onComplete?: () => void;
}

type Action = 'edit' | 'delete' | 'qr';

const AddressDetail: React.FC<AddressDetailProps> = ({
  profileId,
  addressType,
  address,
  onComplete,
}) => {
  const [action, setAction] = useState<Action | null>(null);
  const setAddressForm = useSetRecoilState(addressFormState);

  const deleteAddress = useDeleteAddress();

  const deleteTitle = 'Delete Address';
  const deleteMessage = 'Are you sure you want to delete this address?';

  const isDeleting = action === 'delete';
  const isEditing = action === 'edit';
  const showingQR = action === 'qr';

  const clearAction = () => setAction(null);

  const handleMenuClose = () => {
    clearAction();

    onComplete && onComplete();
  };

  const handleAddressDelete = () => {
    if (!address) return;

    deleteAddress(profileId, address.id, addressType);

    clearAction();
    handleMenuClose();
  };

  return (
    <>
      <DeleteModal
        open={isDeleting}
        onClose={clearAction}
        title={deleteTitle}
        message={deleteMessage}
        onDelete={handleAddressDelete}
      />

      <AnimatedModal open={Boolean(address)} onClose={handleMenuClose}>
        {address && !isEditing && (
          <>
            <AddressCard addressData={address} showQR={showingQR} inModal />

            <AddressMenu
              selectedAddress={address}
              handleQR={() =>
                setAction((action) => (action === 'qr' ? null : 'qr'))
              }
              handleDelete={() => setAction('delete')}
              handleEdit={() => {
                setAddressForm({
                  ...address,
                  addressId: address.id,
                  action: 'EDIT',
                });
                setAction('edit');
              }}
            />
          </>
        )}

        {isEditing && (
          <Paper sx={{ p: 2 }}>
            <PageLayout title="Edit Address" backClick={() => setAction(null)}>
              <AddressForm
                action="EDIT"
                profileId={profileId}
                addressType={addressType}
                address={address as CryptoAddress | FIATAddress}
                onComplete={handleMenuClose}
              />
            </PageLayout>
          </Paper>
        )}
      </AnimatedModal>
    </>
  );
};

export default AddressDetail;
