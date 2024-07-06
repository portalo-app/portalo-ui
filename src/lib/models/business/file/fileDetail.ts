import { FileVariantEntity } from './fileVariant';

export interface FileDetail {
  title: string;
  entity: FileVariantEntity | undefined;
  qrInfo: string;
  extraDatapoints: { label: string; value: any }[];
}
