import {
  ADDRESS_CRYPTO_VARIANT,
  ADDRESS_FIAT_VARIANT,
} from '@constants/address/address.variants';
import { FolderType } from '@models/business/folder';
import { FileVariant } from '@models/business/profile';

export class AddressFolderType implements FolderType {
  id: string;
  label: string;
  variants: FileVariant[];

  constructor() {
    this.id = 'address';
    this.label = 'Address';
    this.variants = [ADDRESS_CRYPTO_VARIANT, ADDRESS_FIAT_VARIANT];
  }
}
