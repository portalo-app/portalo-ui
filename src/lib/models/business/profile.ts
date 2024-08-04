import { DEFAULT_FOLDERS } from '@states/app/app.data';
import { Folder } from './folder/folder';

export class Profile {
  id: string;
  name: string;
  folders: Folder[];

  constructor(name: string) {
    this.name = name;
    this.id = Date.now().toString().substring(0, 8);
    this.folders = DEFAULT_FOLDERS;
  }
}
