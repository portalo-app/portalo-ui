import { IconType } from '@core/ui/Icon';
import { FileType } from '../file/fileType';

export interface FolderType {
  id: FolderTypeEnum;
  label: string;
  fileType: FileType;
  icon: IconType;
}

export enum FolderTypeEnum {
  Social = 'social',
  Address = 'address',
}
