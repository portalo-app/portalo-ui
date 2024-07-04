import { FileVariant } from '@models/business/file/fileVariant';
import { ADDRESS_CRYPTO_ENTITIES } from './crypto.entities';
import { ADDRESS_FIAT_ENTITIES } from './fiat.entities';

export const ADDRESS_CRYPTO_VARIANT: FileVariant = {
  id: 'crypto',
  label: 'Crypto',
  entityLabel: 'Chain',
  availableEntities: ADDRESS_CRYPTO_ENTITIES,
};

export const ADDRESS_FIAT_VARIANT: FileVariant = {
  id: 'fiat',
  label: 'Fiat',
  entityLabel: 'Bank',
  availableEntities: ADDRESS_FIAT_ENTITIES,
};
