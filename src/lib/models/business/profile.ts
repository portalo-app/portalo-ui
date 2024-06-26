import { Entity, FolderFile } from './file';
import { Folder } from './folder';

// Profile model
export interface Profile {
  id: string;
  icon?: string;
  name: string;
  folders: (Folder<AddressFile> | Folder<SocialFile>)[];
}
/* 
// Folders
export interface Folder<T extends FolderFile> {
  id: string;
  type: FolderType;
  files: T[];
}

export interface FolderType {
  id: string;
  label: string;
  icon: LucideIcon;
  variants: FileVariant[];
} */

// Files
// export interface FolderFile {
//   id: string;
//   entity: Entity;
//   tags: Tag[];
//   getFileDetail(): FileDetailData;
// }

// A file variant is a sub-type of an file
export interface FileVariant {
  id: string;
  label: string;
  entityLabel: string;
  availableEntities: Entity[];
}

export interface AddressFile extends FolderFile {
  address: string;
  name?: string;
  alias?: string;
  notes?: string;
}

export interface SocialFile extends FolderFile {
  url: string;
  username: string;
}

// Entity
// export interface Entity {
//   color: string;
//   icon: string;
//   value: string;
//   label: string;
//   validationRegex: RegExp;
//   defaultTags: Tag[];
// }

// Tags
export interface TagCategory {
  icon: string;
  label: string;
}

export interface Tag {
  icon: string;
  label: string;
  category: TagCategory;
}
