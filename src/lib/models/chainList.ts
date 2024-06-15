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

const cryptocurrencies = [
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
    name: 'Binance chain',
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

export default cryptocurrencies;
