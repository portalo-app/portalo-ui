import { FileVariantEntity } from '@models/business/file/fileVariant';

const chains = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#f7931a',
    shareUrl: 'https://btcscan.org/address/',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627eea',
    shareUrl: 'https://etherscan.io/address/',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    color: '#6f41d8',
    shareUrl: 'https://polygonscan.com/address/',
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    color: '#e6007a',
    shareUrl: 'https://polkadot.subscan.io/account/',
  },
  {
    symbol: 'ALGO',
    name: 'Algorand',
    color: '#000000',
    shareUrl: 'https://explorer.perawallet.app/address/',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    color: '#66f9a1',
    shareUrl: 'https://solscan.io/account/',
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    color: '#ef0027',
    shareUrl: 'https://tronscan.org/#/address/',
  },
  {
    symbol: 'BSC',
    name: 'BSC',
    color: '#f3ba2f',
    shareUrl: 'https://bscscan.com/address/',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    color: '#e84142',
    shareUrl: 'https://subnets.avax.network/c-chain/address/',
  },
  {
    symbol: 'GNO',
    name: 'Gnosis',
    color: '#00a6c4',
    shareUrl: 'https://gnosisscan.io/address/',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    color: '#0d1e30',
    shareUrl: 'https://cardanoscan.io/address/',
  },
  {
    symbol: 'ATOM',
    name: 'Cosmos',
    color: '#2e3148',
    shareUrl: 'https://www.mintscan.io/cosmos/address/',
  },
];

export const ADDRESS_CRYPTO_ENTITIES: FileVariantEntity[] = chains.map(
  (chain) => ({
    id: chain.symbol,
    color: chain.color,
    icon: `crypto/${chain.symbol.toLowerCase()}.webp`,
    label: chain.name,
    shareUrl: chain.shareUrl,
  })
);

export const CRYPTO_ADDRESS_REGEX = {
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
