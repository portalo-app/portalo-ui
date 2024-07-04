import { FileVariantEntity } from './fileVariant';

export interface FileDetail {
  title: string;
  entity: FileVariantEntity;
  QRInfo: string;
  dataPoints: Array<{
    key: string;
    value: string;
  }>;
}
