import {
  SOCIAL_MEDIA_VARIANT,
  SOCIAL_MESSAGING_VARIANT,
} from '@constants/social/social.variants';
import { Datapoint, FileType } from './fileType';
import { FileVariant } from './fileVariant';

export class SocialFileType implements FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];

  constructor() {
    this.datapoints = [
      {
        name: 'sername',
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
}
