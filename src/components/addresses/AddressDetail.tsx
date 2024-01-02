import DeleteModal from '@core/components/DeleteModal';
import { Dialog, DialogContent } from '@core/ui/Dialog';
import useDeleteAddress from '@hooks/addresses/useDeleteAddress';
import { ADDRESS_TYPE, CryptoAddress, FIATAddress } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import PageLayout from '../layout/PageLayout';
import AddressCardDetail from './AddressCardDetail';
import AddressForm from './AddressForm';

interface AddressDetailProps {
  profileId: string;
  addressType: ADDRESS_TYPE;
  address: CryptoAddress | FIATAddress;
  onComplete?: () => void;
  handleOpenDialog: () => void;
  isDialogOpen: boolean;
}

type Action = 'edit' | 'delete' | 'qr';

const AddressDetail: React.FC<AddressDetailProps> = ({
  profileId,
  addressType,
  address,
  onComplete,
  handleOpenDialog,
  isDialogOpen,
}) => {
  const [action, setAction] = useState<Action | null>(null);
  const setAddressForm = useSetRecoilState(addressFormState);

  const deleteAddress = useDeleteAddress();

  const deleteTitle = 'Delete Address';
  const deleteMessage = 'Are you sure you want to delete this address?';

  const isDeleting = action === 'delete';
  const isEditing = action === 'edit';

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

      <Dialog open={isDialogOpen} onOpenChange={handleOpenDialog}>
        <DialogContent className="flex justify-center rounded-3xl max-w-md">
          {address && !isEditing && (
            <>
              <AddressCardDetail
                addressData={address}
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
                  handleDelete={() => setAction('delete')}
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
