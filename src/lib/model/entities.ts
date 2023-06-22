import chainsList from 'cryptocurrency-icons/manifest.json';

export interface Entity {
  color: string;
  icon: string;
  value: ChainValue | BankValue;
  label: string;
}

const chainsSymbols = [
  'BTC',
  'ETH',
  'MATIC',
  'USDT',
  'DOT',
  'AAVE',
  'ADA',
  'ALGO',
  'AVAX',
  'BNB',
  'BUSD',
  'DAI',
  'DOGE',
  'FTM',
  'NEAR',
  'SOL',
  'UNI',
  'USDC',
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

export const chains = filteredUniqueChains.map((chain) => ({
  color: chain.color,
  icon: chain.symbol.toLowerCase(),
  value: chain.symbol,
  label: chain.name,
}));

export type ChainValue = (typeof chains)[number]['value'];

export const banks = [
  {
    color: '#e60000',
    icon: 'santander',
    value: 'SANTANDER',
    label: 'Santander',
  },
  { color: '#f7931a', icon: 'galicia', value: 'GALICIA', label: 'Galicia' },
  { color: '#1e3096', icon: 'bbva', value: 'BBVA', label: 'BBVA' },
] as const;

export type BankValue = (typeof banks)[number]['value'];
