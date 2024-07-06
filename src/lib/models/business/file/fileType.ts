import { FileDataDTO } from '@models/dto/file.dto';
import { Datapoint } from './datapoint/datapoint';
import { FileVariant } from './fileVariant';

export interface FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];
  getKeyData(fileData: FileDataDTO): { primary: string; secondary: string };
}
