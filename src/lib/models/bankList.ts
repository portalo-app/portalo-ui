import { Entity } from './space';

const CBU_REGEX = /^[0-9]{22}$/;

export const banks: Entity[] = [
  {
    color: '#007894',
    icon: 'nacion',
    value: 'NACION',
    label: 'Nacion',
    validationRegex: CBU_REGEX,
    defaultTags: [],
  },
  {
    color: '#e60000',
    icon: 'santander',
    value: 'SANTANDER',
    label: 'Santander',
    validationRegex: CBU_REGEX,
    defaultTags: [],
  },
  {
    color: '#f7931a',
    icon: 'galicia',
    value: 'GALICIA',
    label: 'Galicia',
    validationRegex: CBU_REGEX,
    defaultTags: [],
  },
  {
    color: '#1e3096',
    icon: 'bbva',
    value: 'BBVA',
    label: 'BBVA',
    validationRegex: CBU_REGEX,
    defaultTags: [],
  },
  {
    color: '#003057',
    icon: 'macro',
    value: 'MACRO',
    label: 'Macro',
    validationRegex: CBU_REGEX,
    defaultTags: [],
  },
  {
    color: '#db0011',
    icon: 'hsbc',
    value: 'HSBC',
    label: 'Hsbc',
    validationRegex: CBU_REGEX,
    defaultTags: [],
  },
] as const;
