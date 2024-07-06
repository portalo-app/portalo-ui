import { FileVariantEntity } from '@models/business/file/fileVariant';

const CBU_REGEX = /^[0-9]{22}$/;

const banks = [
  {
    id: 'nacion',
    label: 'Nacion',
    color: '#007894',
  },
  {
    id: 'santander',
    label: 'Santander',
    color: '#e60000',
  },
  {
    id: 'galicia',
    label: 'Galicia',
    color: '#f7931a',
  },
  {
    id: 'bbva',
    label: 'BBVA',
    color: '#1e3096',
  },
  {
    id: 'macro',
    label: 'Macro',
    color: '#003057',
  },
  {
    id: 'hsbc',
    label: 'Hsbc',
    color: '#db0011',
  },
  {
    id: 'ciudad',
    label: 'Ciudad',
    color: '#003057',
  },
];

export const ADDRESS_FIAT_ENTITIES: FileVariantEntity[] = banks.map((bank) => ({
  color: bank.color,
  icon: `banks/${bank.id}.webp`,
  id: bank.id,
  label: bank.label,
  validationRegex: CBU_REGEX,
}));
