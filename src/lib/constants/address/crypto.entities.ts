import { Entity } from '@models/business/file';

export const chainsSymbols = [
  'BTC',
  'ETH',
  'MATIC',
  'DOT',
  'ALGO',
  'SOL',
  'TRX',
  'BNB',
  'AVAX',
  'GNO',
  'ADA',
  'ATOM',
] as const;

export const chains = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#f7931a',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627eea',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    color: '#6f41d8',
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    color: '#e6007a',
  },
  {
    symbol: 'ALGO',
    name: 'Algorand',
    color: '#000000',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    color: '#66f9a1',
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    color: '#ef0027',
  },
  {
    symbol: 'BNB',
    name: 'BNB Smart Chain',
    color: '#f3ba2f',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    color: '#e84142',
  },
  {
    symbol: 'GNO',
    name: 'Gnosis',
    color: '#00a6c4',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    color: '#0d1e30',
  },
  {
    symbol: 'ATOM',
    name: 'Cosmos',
    color: '#2e3148',
  },
] as const;

const filteredUniqueChains = Object.values(
  chains
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

export type ChainValue = (typeof chainsSymbols)[number];

const CRYPTO_ADDRESSES_REGEX: {
  [key in (typeof chainsSymbols)[number]]: RegExp;
} = {
  ALGO: /^([A-Za-z0-9]{58})$/,
  BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
  DOT: /^1[0-9a-zA-Z]{47}$/,
  ETH: /^0x[a-fA-F0-9]{40}$/,
  MATIC: /^0x[a-fA-F0-9]{40}$/,
  SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  TRX: /^T[a-zA-Z0-9]{33}$/,
  BNB: /^0x[a-fA-F0-9]{40}$/,
  AVAX: /^[XPC]-[a-zA-Z0-9]{41}$/,
  GNO: /^0x[a-fA-F0-9]{40}$/,
  ADA: /^addr1[0-9a-z]{58}$/,
  ATOM: /^cosmos1[a-z0-9]{38}$/,
};

export const ADDRESS_CRYPTO_ENTITIES: Entity[] = filteredUniqueChains.map(
  (chain) => ({
    color: chain.color,
    icon: chain.symbol.toLowerCase(),
    value: chain.symbol,
    label: chain.name,
    validationRegex:
      CRYPTO_ADDRESSES_REGEX[
        chain.symbol as keyof typeof CRYPTO_ADDRESSES_REGEX
      ],
    defaultTags: [],
  })
);
