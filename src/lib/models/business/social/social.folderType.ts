import {
  SOCIAL_MEDIA_VARIANT,
  SOCIAL_MESSAGING_VARIANT,
} from '@constants/social/social.variants';
import { FolderType } from '@models/business/folder';
import { FileVariant } from '@models/business/profile';

export class SocialFolderType implements FolderType {
  id: string;
  label: string;
  variants: FileVariant[];

  constructor() {
    this.id = 'social';
    this.label = 'Social';
    this.variants = [SOCIAL_MESSAGING_VARIANT, SOCIAL_MEDIA_VARIANT];
  }
}
