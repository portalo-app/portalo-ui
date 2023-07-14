import { AddressFormData } from '@/components/addresses/AddressForm';
import { atom } from 'recoil';

export const addressFormState = atom<Partial<AddressFormData>>({
  key: 'addressFormState',
  default: {},
});
