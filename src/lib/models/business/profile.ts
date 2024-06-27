import { DEFAULT_FOLDERS } from '@states/app/app.data';
import { Entity, FolderFile } from './file';
import { Folder } from './folder';

// Profile class
export class Profile {
  id: string;
  name: string;
  folders: Folder[];

  constructor(name: string) {
    this.name = name;
    this.id = Date.now().toString();
    this.folders = DEFAULT_FOLDERS;
  }
}

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
