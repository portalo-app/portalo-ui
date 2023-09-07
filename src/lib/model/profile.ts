import { Address, CryptoAddress, FIATAddress } from './address';
import { mockCryptoAddresses, mockFIATAddresses } from './entities';

export interface Profile {
  id: string;
  name: string;
  password?: string;
  cryptoAddresses: CryptoAddress[];
  fiatAddresses: FIATAddress[];
}

export interface PortaloAddressContract {
  name: string;
  entity: string;
  portaloAddress: string;
}

export interface ProfileContract {
  profileAlias: string;
  owner: string;
  exists: boolean;
  cryptoAddresses: PortaloAddressContract[];
  fiatAddresses: PortaloAddressContract[];
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

export const mapAddressToContract = (
  address: Address
): PortaloAddressContract => {
  return {
    entity: address.entity.label,
    name: address.name || '',
    portaloAddress: address.address,
  };
};

export const mapProfileToContract = (
  profile: Profile,
  ownerAddress: string
): ProfileContract => {
  return {
    profileAlias: profile.name,
    owner: ownerAddress,
    exists: true,
    cryptoAddresses: profile.cryptoAddresses.map(mapAddressToContract),
    fiatAddresses: profile.cryptoAddresses.map(mapAddressToContract),
  };
};
