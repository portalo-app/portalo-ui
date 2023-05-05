export interface Address {
  color: string;
  icon: string;
  entity: string; // Bank, exchange, wallet OR BTC, ETH, etc.
  address: string;
  name?: string;
  alias?: string;
  notes?: string;
}

export interface CryptoAddress extends Address {
  type?: string; // Custodial, non-custodial, etc.
}

export interface FIATAddress extends Address {
  currency: string; // USD, EUR, etc.
}

export const mockCryptoAddresses: CryptoAddress[] = [
  {
    color: '#f7931a',
    icon: 'bitcoin',
    entity: 'Bitcoin',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    name: 'Safe',
    type: 'custodial',
  },
  {
    color: '#5c6bc0',
    icon: 'ethereum',
    entity: 'Ethereum',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Social',
    alias: 'defiargentina.eth',
    type: 'non-custodial',
  },
  {
    color: '#6c49b8',
    icon: 'polygon',
    entity: 'Polygon',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Main',
    type: 'non-custodial',
  },
  {
    color: '#5c6bc0',
    icon: 'ethereum',
    entity: 'Ethereum',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Social',
    alias: 'defiargentina.eth',
    type: 'non-custodial',
  },
  {
    color: '#6c49b8',
    icon: 'polygon',
    entity: 'Polygon',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Main',
    type: 'non-custodial',
  },
  {
    color: '#5c6bc0',
    icon: 'ethereum',
    entity: 'Ethereum',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Social',
    alias: 'defiargentina.eth',
    type: 'non-custodial',
  },
  {
    color: '#6c49b8',
    icon: 'polygon',
    entity: 'Polygon',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Main',
    type: 'non-custodial',
  },
];

export const mockFIATAddresses: FIATAddress[] = [
  {
    color: '#e60000',
    icon: 'santander',
    entity: 'Santander',
    address: '0290000100000000058382',
    name: 'Checking account',
    currency: 'ARS',
  },
];
