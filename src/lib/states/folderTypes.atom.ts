import { AddressFolderType } from '@models/business/folder/address.folderType';
import { BookmarkFolderType } from '@models/business/folder/bookmarks.folderType';
import { FolderType } from '@models/business/folder/folderType';
import { SocialFolderType } from '@models/business/folder/social.folderType';
import { atom } from 'recoil';

export const folderTypesState = atom<FolderType[]>({
  key: 'folderTypes',
  default: [
    new AddressFolderType(),
    new SocialFolderType(),
    new BookmarkFolderType(),
  ],
});
