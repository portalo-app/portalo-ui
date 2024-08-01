import { FileVariant } from '@models/business/file/fileVariant';
import { BOOKMARK_ENTITIES } from './bookmark.entities';

export const BOOKMARK_VARIANT: FileVariant = {
  id: 'bookmark',
  label: 'Bookmark',
  entityLabel: 'Bookmark',
  availableEntities: BOOKMARK_ENTITIES,
};
