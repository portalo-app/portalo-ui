import chainsList from 'cryptocurrency-icons/manifest.json';
import { CryptoAddress, CryptoAddressesRegex, FIATAddress } from './address';

export interface Entity {
  color: string;
  icon: string;
  value: (typeof EntityValue)[number];
  label: string;
  addressRegex?: RegExp;
}

export const chainsSymbols = [
  'BTC',
  'ETH',
  'MATIC',
  'DOT',
  'ALGO',
  'SOL',
  'UNI',
  'ATOM',
  'SCRT',
  // 'OSMO',
] as const;

const fullChainList = [
  ...chainsList,
  {
    symbol: 'SCRT',
    name: 'Secret',
    color: '#302c2c',
  },
  // {
  //   symbol: 'OSMO',
  //   name: 'Osmosis',
  //   color: '#ec1076',
  // },
];

const filteredUniqueChains = Object.values(
  fullChainList
    .filter((chain) =>
      (chainsSymbols as ReadonlyArray<string>).includes(chain.symbol)
    )
    .reduce(
      (
        accumulator: {
          [key: string]: {
            symbol: string;
            name: string;
            color: string;
          };
        },
        current
      ) => ({
        ...accumulator,
        [current.symbol]: current,
      }),
      {}
    )
);

export const chains: Entity[] = filteredUniqueChains.map((chain) => ({
  color: chain.color,
  icon: chain.symbol.toLowerCase(),
  value: chain.symbol as ChainValue,
  label: chain.name,
  addressRegex:
    CryptoAddressesRegex[chain.symbol as keyof typeof CryptoAddressesRegex],
}));

const CBU_REGEX = /^[0-9]{22}$/;

export const banks = [
  {
    color: '#007894',
    icon: 'nacion',
    value: 'NACION',
    label: 'Nacion',
    addressRegex: CBU_REGEX,
  },
  {
    color: '#e60000',
    icon: 'santander',
    value: 'SANTANDER',
    label: 'Santander',
    addressRegex: CBU_REGEX,
  },
  {
    color: '#f7931a',
    icon: 'galicia',
    value: 'GALICIA',
    label: 'Galicia',
    addressRegex: CBU_REGEX,
  },
  {
    color: '#1e3096',
    icon: 'bbva',
    value: 'BBVA',
    label: 'BBVA',
    addressRegex: CBU_REGEX,
  },
  {
    color: '#003057',
    icon: 'macro',
    value: 'MACRO',
    label: 'Macro',
    addressRegex: CBU_REGEX,
  },
  {
    color: '#db0011',
    icon: 'hsbc',
    value: 'HSBC',
    label: 'Hsbc',
    addressRegex: CBU_REGEX,
  },
] as const;

export const ENTITIES = [...chains, ...banks];

export type ChainValue = (typeof chainsSymbols)[number];
export type BankValue = (typeof banks)[number]['value'];

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

export const banksSymbols = banks.map(({ value }) => value);

export const EntityValue = [
  ...chainsSymbols,
  ...banksSymbols,
  'DEFAULT_CHAIN',
  'DEFAULT_BANK',
] as const;
