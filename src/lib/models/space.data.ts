import { Share2, Wallet } from 'lucide-react';
import { banks, chains } from './address.entities';
import { MEDIA_ENTITIES, MESSAGING_ENTITIES } from './social.entities';
import { AddressElement, SocialElement, Vault, VaultType } from './space';

export const ADDRESS_TYPE: VaultType = {
  id: 'address',
  label: 'Address',
  icon: Wallet,
  variants: [
    {
      id: 'crypto',
      label: 'Crypto',
      entityLabel: 'Blockchain',
      availableEntities: chains,
    },
    {
      id: 'fiat',
      label: 'Fiat',
      entityLabel: 'Bank',
      availableEntities: banks,
    },
  ],
};

export const SOCIAL_TYPE: VaultType = {
  id: 'social',
  label: 'Social',
  icon: Share2,
  variants: [
    {
      id: 'messaging',
      label: 'Messaging',
      entityLabel: 'Social Network',
      availableEntities: MESSAGING_ENTITIES,
    },
    {
      id: 'media',
      label: 'Media',
      entityLabel: 'Social Network',
      availableEntities: MEDIA_ENTITIES,
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
