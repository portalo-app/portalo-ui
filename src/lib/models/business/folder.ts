// Folders
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

export interface FolderType {
  id: string;
  label: string;
}
