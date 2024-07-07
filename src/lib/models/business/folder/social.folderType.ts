import { FileType } from '../file/fileType';
import { SocialFileType } from '../file/social.fileType';
import { FolderType } from '../folder/folderType';

export class SocialFolderType implements FolderType {
  id: string;
  label: string;
  fileType: FileType;

  constructor() {
    this.id = 'social';
    this.label = 'Social';
    this.fileType = new SocialFileType();
  }
}
