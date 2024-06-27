import { FolderFile } from './file';
import { FileVariant } from './profile';

// Folders
export interface Folder {
  id: string;
  type: FolderType;
  files: FolderFile[];
}

export interface FolderType {
  id: string;
  label: string;
  // icon: LucideIcon;
  variants: FileVariant[];
}
