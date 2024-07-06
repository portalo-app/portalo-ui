export interface Datapoint {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean';
  order: number;
  placeholder: string;
  validations?: DatapointValidation[];
}

export interface DatapointValidation {
  type: 'min' | 'max' | 'isOptional';
  value: number | boolean;
  errorMessage?: string;
}
