import { Tag } from '@models/business/profile';

export interface FolderFile {
  id: string;
  entity: Entity;
  tags: Tag[];
  // getFileDetail(): FileDetailData;
}

export interface Entity {
  color: string;
  icon: string;
  value: string;
  label: string;
  validationRegex: RegExp;
  defaultTags: Tag[];
}
