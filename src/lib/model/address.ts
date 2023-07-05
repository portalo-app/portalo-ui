import { Entity, banks, chains, chainsSymbols } from './entities';

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

export type AddressType = 'CRYPTO' | 'FIAT';

export const mockCryptoAddresses: CryptoAddress[] = [
  {
    id: '1',
    entity: chains[0],
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    name: 'Safe',
    type: 'custodial',
  },
  {
    id: '2',
    entity: chains[1],
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Social',
    alias: 'defiargentina.eth',
    type: 'non-custodial',
  },
  {
    id: '3',
    entity: chains[2],
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Main',
    type: 'non-custodial',
  },
];

export const mockFIATAddresses: FIATAddress[] = [
  {
    id: '1',
    entity: banks[0],
    address: '0290000100000000058382',
    name: 'Checking account',
    currency: 'ARS',
  },
];

export const CryptoAddressesRegex: {
  [key in (typeof chainsSymbols)[number]]: RegExp;
} = {
  ALGO: /^([A-Za-z0-9]{58})$/,
  BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
  DOT: /^1[0-9a-zA-Z]{47}/,
  ETH: /^0x[a-fA-F0-9]{40}$/,
  MATIC: /^0x[a-fA-F0-9]{40}$/,
  SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  UNI: /^0x[a-fA-F0-9]{40}$/,
};
