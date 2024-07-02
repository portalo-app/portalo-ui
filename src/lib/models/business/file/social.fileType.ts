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
        name: 'messaging',
        type: 'string',
        order: 1,
      },
      {
        name: 'username',
        type: 'string',
        order: 2,
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
