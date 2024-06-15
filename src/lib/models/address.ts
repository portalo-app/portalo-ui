import { chainsSymbols } from './chainList';
import { Entity } from './space';

export interface Address {
  id: string;
  entity: Entity; // Bank, exchange, wallet OR BTC, ETH, etc.
  address: string;
  name?: string;
  alias?: string;
  notes?: string;
}

export interface CryptoAddress extends Address {
  type?: string; // Custodial, non-custodial, etc.
}

export interface FIATAddress extends Address {
  currency?: string; // USD, EUR, etc.
}

export enum ADDRESS_TYPE {
  CRYPTO = 'CRYPTO',
  FIAT = 'FIAT',
}

export const CryptoAddressesRegex: {
  [key in (typeof chainsSymbols)[number]]: RegExp;
} = {
  ALGO: /^([A-Za-z0-9]{58})$/,
  BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
  DOT: /^1[0-9a-zA-Z]{47}$/,
  ETH: /^0x[a-fA-F0-9]{40}$/,
  MATIC: /^0x[a-fA-F0-9]{40}$/,
  SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  TRX: /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
  BNB: /^(bnb1)[0-9a-z]{38}$/,
  AVAX: /^(X-avax1)[0-9a-z]{38}$/,
  GNO: /^0x[a-fA-F0-9]{40}$/,
  ADA: /^([A-Za-z0-9]{58,})$/,
  ATOM: /^(cosmos1)[0-9a-z]{38}$/,
};
