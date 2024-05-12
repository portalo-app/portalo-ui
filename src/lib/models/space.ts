import { CryptoAddress, FIATAddress } from './address';
import { mockCryptoAddresses, mockFIATAddresses } from './entities';

export interface Space {
  id: string;
  name: string;
  cryptoAddresses: CryptoAddress[];
  fiatAddresses: FIATAddress[];
}

export const mockSpaceJohn: Space = {
  id: '1',
  name: 'John Doe',
  cryptoAddresses: mockCryptoAddresses,
  fiatAddresses: mockFIATAddresses,
};

export const mockSpaceAlice: Space = {
  id: '2',
  name: 'Alice Doe',
  cryptoAddresses: mockCryptoAddresses,
  fiatAddresses: mockFIATAddresses,
};

export const mockSpaces: Space[] = [mockSpaceJohn, mockSpaceAlice];
