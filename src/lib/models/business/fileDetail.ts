import { Entity } from '@models/business/file';

export interface FileDetail {
  title: string;
  entity: Entity;
  QRInfo: string;
  dataPoints: Array<{
    key: string;
    value: string;
  }>;
}
