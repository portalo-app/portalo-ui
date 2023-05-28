export interface Entity {
  color: string;
  icon: string;
  value: ChainValue | BankValue;
  label: string;
}

export const chains = [
  { color: '#f7931a', icon: 'bitcoin', value: 'BTC', label: 'Bitcoin' },
  { color: '#5c6bc0', icon: 'ethereum', value: 'ETH', label: 'Ethereum' },
  { color: '#6c49b8', icon: 'polygon', value: 'MATIC', label: 'Polygon' },
] as const;

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
