import { FileVariant } from '@models/business/file/fileVariant';
import { MEDIA_ENTITIES } from './media.entities';
import { MESSAGING_ENTITIES } from './messaging.entities';

export const SOCIAL_MESSAGING_VARIANT: FileVariant = {
  id: 'messaging',
  label: 'Messaging',
  entityLabel: 'Messaging Application',
  availableEntities: MESSAGING_ENTITIES,
};

export const SOCIAL_MEDIA_VARIANT: FileVariant = {
  id: 'media',
  label: 'Media',
  entityLabel: 'Social Network',
  availableEntities: MEDIA_ENTITIES,
};
