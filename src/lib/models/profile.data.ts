import { Landmark, MessageSquare } from 'lucide-react';
import { banks, chains } from './address.entities';
import { AddressFile, Folder, FolderType, SocialFile } from './profile';
import { MEDIA_ENTITIES, MESSAGING_ENTITIES } from './social.entities';

export const ADDRESS_TYPE: FolderType = {
  id: 'address',
  label: 'Address',
  icon: Landmark,
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

export const SOCIAL_TYPE: FolderType = {
  id: 'social',
  label: 'Social',
  icon: MessageSquare,
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

export const DEFAULT_ADDRESSES_FOLDER: Folder<AddressFile> = {
  id: 'address',
  type: ADDRESS_TYPE,
  files: [],
};

export const DEFAULT_SOCIAL_FOLDER: Folder<SocialFile> = {
  id: 'social',
  type: SOCIAL_TYPE,
  files: [],
};

export const DEFAULT_FOLDERS = [
  DEFAULT_ADDRESSES_FOLDER,
  DEFAULT_SOCIAL_FOLDER,
];
