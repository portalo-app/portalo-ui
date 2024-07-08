import { IconType } from '@core/ui/Icon';
import { FileType } from '../file/fileType';

export interface FolderType {
  id: string;
  label: string;
  fileType: FileType;
  icon: IconType;
}
