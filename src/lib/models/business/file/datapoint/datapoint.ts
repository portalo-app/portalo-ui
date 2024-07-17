export interface Datapoint {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean';
  order: number;
  placeholder: string;
  validations?: DatapointValidation[];
}

export interface DatapointValidation {
  type: 'min' | 'max' | 'regex' | 'isOptional';
  value: number | string | boolean;
  errorMessage?: string;
}
