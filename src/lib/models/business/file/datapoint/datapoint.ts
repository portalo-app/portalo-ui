export interface Datapoint {
  id: string;
  name: string;
  type: DatapointType;
  order: number;
  placeholder: string;
  validations?: DatapointValidation[];
}

export interface DatapointValidation {
  type: DatapointValidationType;
  value: number | boolean;
  errorMessage?: string;
}

export type DatapointType = 'string' | 'number' | 'boolean';
export type DatapointValidationType = 'min' | 'max' | 'isOptional';
