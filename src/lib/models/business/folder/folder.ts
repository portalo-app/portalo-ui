import { File } from '../file/file';
import { FolderType } from './folderType';

export class Folder {
  id: string;
  files: File[];
  folderType: FolderType;

  constructor(id: string, folderType: FolderType) {
    this.id = id;
    this.files = [];
    this.folderType = folderType;
  }
}
