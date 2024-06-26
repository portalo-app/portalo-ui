import { Entity } from '@models/business/file';
import { Tag } from '@models/business/profile';

export interface FileDetailData {
  title: string;
  entity: Entity;
  QRInfo: string;
  tags: Tag[];
  dataPoints: Array<{
    key: string;
    value: string;
  }>;
}
