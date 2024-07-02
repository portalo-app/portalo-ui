import { AddressFolderType } from '@models/business/folder/address.folderType';
import { Folder } from '@models/business/folder/folder';
import { SocialFolderType } from '@models/business/folder/social.folderType';

export const EMPTY_SOCIAL_FOLDER: Folder = {
  id: 'social',
  folderType: new SocialFolderType(),
  files: [],
};

export const EMPTY_ADDRESS_FOLDER: Folder = {
  id: 'address',
  folderType: new AddressFolderType(),
  files: [],
};

export const DEFAULT_FOLDERS: Folder[] = [
  EMPTY_SOCIAL_FOLDER,
  EMPTY_ADDRESS_FOLDER,
];
