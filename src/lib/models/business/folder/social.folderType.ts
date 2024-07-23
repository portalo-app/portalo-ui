import { IconType } from '@core/ui/Icon';
import { FileType } from '../file/fileType';
import { SocialFileType } from '../file/social.fileType';
import { FolderType, FolderTypeEnum } from '../folder/folderType';

export class SocialFolderType implements FolderType {
  id: FolderTypeEnum;
  label: string;
  fileType: FileType;
  icon: IconType;

  constructor() {
    this.id = FolderTypeEnum.Social;
    this.label = 'Social';
    this.fileType = new SocialFileType();
    this.icon = 'MessagesSquare';
  }
}
