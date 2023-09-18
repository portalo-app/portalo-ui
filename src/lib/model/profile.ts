import { Address, CryptoAddress, FIATAddress } from './address';
import {
  banks,
  chains,
  mockCryptoAddresses,
  mockFIATAddresses,
} from './entities';

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
    fiatAddresses: profile.fiatAddresses.map(mapAddressToContract),
  };
};

export const mapContractAddress = (
  address: PortaloAddressContract,
  isCrypto: boolean
): Address => {
  return {
    entity: (isCrypto
      ? chains.find((chain) => chain.label === address.entity)
      : banks.find((bank) => bank.label === address.entity)) || {
      color: 'gray',
      label: address.entity,
      icon: isCrypto ? 'DEFAULT_CHAIN' : 'DEFAULT_BANK',
      value: isCrypto ? 'DEFAULT_CHAIN' : 'DEFAULT_BANK',
    },
    address: address.portaloAddress,
    name: address.name,
  };
};

export const mapContractProfile = (
  portaloProfile: ProfileContract
): Profile => {
  return {
    id: portaloProfile.profileAlias,
    name: portaloProfile.profileAlias,
    cryptoAddresses: portaloProfile.cryptoAddresses.map((address) =>
      mapContractAddress(address, true)
    ),
    fiatAddresses: portaloProfile.fiatAddresses.map((address) =>
      mapContractAddress(address, false)
    ),
  };
};
