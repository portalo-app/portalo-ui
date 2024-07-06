import {
  ADDRESS_CRYPTO_VARIANT,
  ADDRESS_FIAT_VARIANT,
} from '@constants/address/address.variants';
import { FileDataDTO } from '@models/dto/file.dto';
import { Datapoint } from './datapoint/datapoint';
import { FileDetail } from './fileDetail';
import { FileType } from './fileType';
import { FileVariant } from './fileVariant';

export class AddressFileType implements FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];

  constructor() {
    this.datapoints = [
      {
        id: 'address',
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
        id: 'name',
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
        id: 'alias',
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
        id: 'notes',
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

  getKeyData(fileData: FileDataDTO): { primary: string; secondary: string } {
    return { primary: fileData.name, secondary: fileData.address };
  }

  getDetailData(fileData: FileDataDTO): FileDetail {
    const entity = this.variants
      .find((variant) => variant.id === fileData.variant)
      ?.availableEntities.find((entity) => entity.id === fileData.entity);

    return {
      title: fileData.name,
      entity,
      qrInfo: entity?.shareUrl + fileData.address,
      extraDatapoints: [
        {
          label: 'Alias',
          value: fileData.alias,
        },
        {
          label: 'Notes',
          value: fileData.notes,
        },
      ],
    };
  }
}
