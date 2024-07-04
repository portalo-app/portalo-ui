import { FileVariant } from './fileVariant';

export interface FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];
}

export interface Datapoint {
  name: string;
  type: DatapointType;
  order: number;
  validations?: DatapointValidation[];
}

export interface DatapointValidation {
  type: DatapointValidationType;
  value: number | boolean;
  errorMessage?: string;
}

export type DatapointType = 'string' | 'number' | 'boolean';
export type DatapointValidationType = 'min' | 'max' | 'isOptional';
