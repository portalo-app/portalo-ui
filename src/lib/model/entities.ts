import chainsList from 'cryptocurrency-icons/manifest.json';
import { CryptoAddressesRegex } from './address';

export interface Entity {
  color: string;
  icon: string;
  value: ChainValue | BankValue;
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
] as const;

const filteredUniqueChains = Object.values(
  chainsList
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

export type ChainValue = (typeof chainsSymbols)[number];

export const banks = [
  { color: '#007894', icon: 'nacion', value: 'NACION', label: 'Nacion' },
  {
    color: '#e60000',
    icon: 'santander',
    value: 'SANTANDER',
    label: 'Santander',
  },
  { color: '#f7931a', icon: 'galicia', value: 'GALICIA', label: 'Galicia' },
  { color: '#1e3096', icon: 'bbva', value: 'BBVA', label: 'BBVA' },
  { color: '#003057', icon: 'macro', value: 'MACRO', label: 'Macro' },
  { color: '#db0011', icon: 'hsbc', value: 'HSBC', label: 'Hsbc' },
] as const;

export type BankValue = (typeof banks)[number]['value'];
