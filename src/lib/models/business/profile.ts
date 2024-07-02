import { DEFAULT_FOLDERS } from '@states/app/app.data';
import { Folder } from './folder/folder';

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

// export interface AddressFile extends File {
//   address: string;
//   name?: string;
//   alias?: string;
//   notes?: string;
// }

// export interface SocialFile extends File {
//   url: string;
//   username: string;
// }
