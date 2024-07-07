import { FileDataDTO } from '@models/dto/file.dto';
import { Datapoint } from './datapoint/datapoint';
import { FileDetail } from './fileDetail';
import { FileVariant } from './fileVariant';

export interface FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];
  getKeyData(fileData: FileDataDTO): { primary: string; secondary: string };
  getDetailData(fileData: FileDataDTO): FileDetail;
}
