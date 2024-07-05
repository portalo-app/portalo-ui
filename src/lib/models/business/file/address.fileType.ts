import {
  ADDRESS_CRYPTO_VARIANT,
  ADDRESS_FIAT_VARIANT,
} from '@constants/address/address.variants';
import { Datapoint, FileType } from './fileType';
import { FileVariant } from './fileVariant';

export class AddressFileType implements FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];

  constructor() {
    this.datapoints = [
      {
        name: 'Address',
        type: 'string',
        order: 1,
        placeholder: '0x123...',
        validations: [
          {
            type: 'min',
            value: 10,
          },
          {
            type: 'max',
            value: 100,
          },
        ],
      },
      {
        name: 'Name',
        type: 'string',
        order: 2,
        placeholder: "John's Wallet",
        validations: [
          {
            type: 'min',
            value: 4,
          },
          {
            type: 'max',
            value: 30,
          },
        ],
      },
      {
        name: 'Alias',
        type: 'string',
        order: 3,
        placeholder: 'john.eth',
        validations: [
          {
            type: 'min',
            value: 4,
          },
          {
            type: 'max',
            value: 30,
          },
          {
            type: 'isOptional',
            value: true,
          },
        ],
      },
      {
        name: 'Notes',
        type: 'string',
        order: 4,
        placeholder: 'Notes about this address',
        validations: [
          {
            type: 'max',
            value: 200,
          },
          {
            type: 'isOptional',
            value: true,
          },
        ],
      },
    ];
    this.variants = [ADDRESS_CRYPTO_VARIANT, ADDRESS_FIAT_VARIANT];
  }
}
