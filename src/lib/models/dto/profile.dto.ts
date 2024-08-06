import { FolderDTO } from './folder.dto';

export interface ProfileDTO {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  folders: FolderDTO[];
}
