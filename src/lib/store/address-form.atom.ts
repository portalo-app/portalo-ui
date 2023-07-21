import { AddressFormData } from '@/components/addresses/AddressForm';
import { atom } from 'recoil';

export const addressFormState = atom<
  Partial<AddressFormData> & { addressId?: string; action?: 'EDIT' | 'CREATE' }
>({
  key: 'addressFormState',
  default: {},
});
