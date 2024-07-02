import { FileType } from './fileType';
import { FileVariantEntity } from './fileVariant';

export interface File {
  id: string;
  entity: FileVariantEntity;
  type: FileType;
  // getFileDetail(): FileDetailData;
}
