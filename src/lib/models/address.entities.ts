import { banks } from '../constants/bankList';
import chainsList, { chainsSymbols } from '../constants/chainList';
import { CryptoAddress, CryptoAddressesRegex, FIATAddress } from './address';
import { Entity } from './space';

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
  validationRegex:
    CryptoAddressesRegex[chain.symbol as keyof typeof CryptoAddressesRegex],
  defaultTags: [],
}));

export const ENTITIES = [...chains, ...banks] as Entity[];

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
export { banks };
