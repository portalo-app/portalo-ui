import { FileDTO } from './file.dto';

export interface FolderDTO {
  id: string;
  folderTypeId: string;
  files: FileDTO[];
}
