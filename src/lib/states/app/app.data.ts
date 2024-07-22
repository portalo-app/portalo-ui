import { AddressFolderType } from '@models/business/folder/address.folderType';
import { Folder } from '@models/business/folder/folder';
import { FolderTypeEnum } from '@models/business/folder/folderType';
import { SocialFolderType } from '@models/business/folder/social.folderType';

const EMPTY_SOCIAL_FOLDER: Folder = {
  id: FolderTypeEnum.Social,
  folderType: new SocialFolderType(),
  files: [],
};

const EMPTY_ADDRESS_FOLDER: Folder = {
  id: FolderTypeEnum.Address,
  folderType: new AddressFolderType(),
  files: [],
};

export const DEFAULT_FOLDERS: Folder[] = [
  EMPTY_SOCIAL_FOLDER,
  EMPTY_ADDRESS_FOLDER,
];
