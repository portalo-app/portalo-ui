import useDeleteAddress from '@/lib/hooks/addresses/useDeleteAddress';
import DeleteModal from '@core/components/DeleteModal';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import PageLayout from '../layout/PageLayout';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import AddressMenu from './AddressMenu';

import { Dialog, DialogContent } from '@core/ui/Dialog';

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

      <Dialog open={Boolean(address)}>
        <DialogContent className="bg-background rounded-3xl border-none">
          {address && !isEditing && (
            <>
              <AddressCard addressData={address} showQR={showingQR} />

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
            <div>
              <PageLayout
                title="Edit Address"
                backClick={() => setAction(null)}
              >
                <AddressForm
                  action="EDIT"
                  profileId={profileId}
                  addressType={addressType}
                  address={address as CryptoAddress | FIATAddress}
                  onComplete={handleMenuClose}
                />
              </PageLayout>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressDetail;
