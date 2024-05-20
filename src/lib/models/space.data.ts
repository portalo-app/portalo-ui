import { AddressElement, SocialElement, Vault, VaultType } from './space';

export const ADDRESS_TYPE: VaultType = {
  id: 'address',
  label: 'Addresses',
};

export const SOCIAL_TYPE: VaultType = {
  id: 'social',
  label: 'Social',
};

export const DEFAULT_ADDRESSES_VAULT: Vault<AddressElement> = {
  id: 'address',
  type: ADDRESS_TYPE,
  elements: [],
};

export const DEFAULT_SOCIAL_VAULT: Vault<SocialElement> = {
  id: 'social',
  type: SOCIAL_TYPE,
  elements: [],
};

export const DEFAULT_VAULTS = [DEFAULT_ADDRESSES_VAULT, DEFAULT_SOCIAL_VAULT];
