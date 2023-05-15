import {
  CryptoAddress,
  FIATAddress,
  mockCryptoAddresses,
  mockFIATAddresses,
} from './address';

export interface Profile {
  id: string;
  name: string;
  password?: string;
  cryptoAddresses: CryptoAddress[];
  fiatAddresses: FIATAddress[];
}

export const mockProfileJohn: Profile = {
  id: '1',
  name: 'John Doe',
  cryptoAddresses: mockCryptoAddresses,
  fiatAddresses: mockFIATAddresses,
};

export const mockProfileAlice: Profile = {
  id: '2',
  name: 'Alice Doe',
  cryptoAddresses: mockCryptoAddresses,
  fiatAddresses: mockFIATAddresses,
};

export const mockProfiles: Profile[] = [mockProfileJohn, mockProfileAlice];
