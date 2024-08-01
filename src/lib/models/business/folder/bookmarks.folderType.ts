import { IconType } from '@core/ui/Icon';
import { BookmarkFileType } from '../file/bookmark.fileType';
import { FileType } from '../file/fileType';
import { FolderType, FolderTypeEnum } from './folderType';

export class BookmarkFolderType implements FolderType {
  id: FolderTypeEnum;
  label: string;
  fileType: FileType;
  icon: IconType;

  constructor() {
    this.id = FolderTypeEnum.Bookmark;
    this.label = 'Bookmarks';
    this.fileType = new BookmarkFileType();
    this.icon = 'Paperclip';
  }
}
