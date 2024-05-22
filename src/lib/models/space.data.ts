import { Share2, Wallet } from 'lucide-react';
import { ENTITIES } from './address.entities';
import { AddressElement, SocialElement, Vault, VaultType } from './space';

export const ADDRESS_TYPE: VaultType = {
  id: 'address',
  label: 'Addresses',
  icon: Wallet,
  entityLabel: 'Bank or Blockchain',
  availableEntities: ENTITIES,
};

export const SOCIAL_TYPE: VaultType = {
  id: 'social',
  label: 'Social',
  icon: Share2,
  entityLabel: 'Social Network',
  availableEntities: [
    {
      color: '#1e88e5',
      icon: 'twitter',
      value: 'TWITTER',
      label: 'Twitter',
      validationRegex: /https:\/\/twitter.com\/.*/,
      defaultTags: [],
    },
    {
      color: '#0077b5',
      icon: 'linkedin',
      value: 'LINKEDIN',
      label: 'LinkedIn',
      validationRegex: /https:\/\/www.linkedin.com\/.*/,
      defaultTags: [],
    },
    {
      color: '#1877f2',
      icon: 'facebook',
      value: 'FACEBOOK',
      label: 'Facebook',
      validationRegex: /https:\/\/www.facebook.com\/.*/,
      defaultTags: [],
    },
    {
      color: '#ff0000',
      icon: 'youtube',
      value: 'YOUTUBE',
      label: 'Youtube',
      validationRegex: /https:\/\/www.youtube.com\/.*/,
      defaultTags: [],
    },
  ],
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
