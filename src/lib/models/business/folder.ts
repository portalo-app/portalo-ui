import { FolderFile } from './file';
import { FileVariant } from './profile';

// Folders
export interface Folder<T extends FolderFile> {
  id: string;
  type: FolderType;
  files: T[];
}

export interface FolderType {
  id: string;
  label: string;
  // icon: LucideIcon;
  variants: FileVariant[];
}
