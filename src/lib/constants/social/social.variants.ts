import { FileVariant } from '@models/business/file';
import { MEDIA_ENTITIES } from './media.entities';
import { MESSAGING_ENTITIES } from './messaging.entities';

export const SOCIAL_MESSAGING_VARIANT: FileVariant = {
  id: 'social',
  label: 'Social',
  entityLabel: 'Messaging',
  availableEntities: MESSAGING_ENTITIES,
};

export const SOCIAL_MEDIA_VARIANT: FileVariant = {
  id: 'social',
  label: 'Social',
  entityLabel: 'Media',
  availableEntities: MEDIA_ENTITIES,
};
