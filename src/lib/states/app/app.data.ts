import { AddressFolderType } from '@models/business/address/address.folderType';
import { Folder } from '@models/business/folder';
import { SocialFolderType } from '@models/business/social/social.folderType';

export const EMPTY_SOCIAL_FOLDER: Folder = {
  id: 'social',
  type: new SocialFolderType(),
  files: [],
};

export const EMPTY_ADDRESS_FOLDER: Folder = {
  id: 'address',
  type: new AddressFolderType(),
  files: [],
};

export const DEFAULT_FOLDERS: Folder[] = [
  EMPTY_SOCIAL_FOLDER,
  EMPTY_ADDRESS_FOLDER,
];
