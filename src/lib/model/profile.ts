import {
  CryptoAddress,
  FIATAddress,
  mockCryptoAddresses,
  mockFIATAddresses,
} from './address';

export interface Profile {
  name: string;
  cryptoAddresses: CryptoAddress[];
  fiatAddresses: FIATAddress[];
}

export const mockProfileJohn: Profile = {
  name: 'John Doe',
  cryptoAddresses: mockCryptoAddresses,
  fiatAddresses: mockFIATAddresses,
};

export const mockProfileAlice: Profile = {
  name: 'Alice Doe',
  cryptoAddresses: mockCryptoAddresses,
  fiatAddresses: mockFIATAddresses,
};

export const mockProfiles: Profile[] = [mockProfileJohn, mockProfileAlice];
