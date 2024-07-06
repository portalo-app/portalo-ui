import {
  SOCIAL_MEDIA_VARIANT,
  SOCIAL_MESSAGING_VARIANT,
} from '@constants/social/social.variants';
import { FileDataDTO } from '@models/dto/file.dto';
import { Datapoint } from './datapoint/datapoint';
import { FileType } from './fileType';
import { FileVariant } from './fileVariant';

export class SocialFileType implements FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];

  constructor() {
    this.datapoints = [
      {
        id: 'username',
        name: 'Username',
        type: 'string',
        order: 1,
        placeholder: 'john_doe',
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
    ];
    this.variants = [SOCIAL_MESSAGING_VARIANT, SOCIAL_MEDIA_VARIANT];
  }

  getKeyData(fileData: FileDataDTO): { primary: string; secondary: string } {
    return { primary: fileData.username, secondary: 'www.google.com.ar' };
  }
}
