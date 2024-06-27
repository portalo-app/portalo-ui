import { FolderDTO } from './folder.dto';

export interface ProfileDTO {
  id: string;
  name: string;
  folders: FolderDTO[];
}
