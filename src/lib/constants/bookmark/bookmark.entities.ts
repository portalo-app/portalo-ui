import { FileVariantEntity } from '@models/business/file/fileVariant';

const bookmarks = [
  {
    id: 'web',
    label: 'Web',
    icon: '',
  },
  {
    id: 'news',
    label: 'News',
    icon: '',
  },
  {
    id: 'music',
    label: 'Music',
    icon: '',
  },
  {
    id: 'documents',
    label: 'Documents/Articles',
    icon: '',
  },
  {
    id: 'education',
    label: 'Education',
    icon: '',
  },
  {
    id: 'events',
    label: 'Events',
    icon: '',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: '',
  },
  {
    id: 'trips',
    label: 'Trips',
    icon: '',
  },
  {
    id: 'health',
    label: 'Health',
    icon: '',
  },
  {
    id: 'home',
    label: 'Home',
    icon: '',
  },
  {
    id: 'recipe',
    label: 'Recipe',
    icon: '',
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: '',
  },
];

export const BOOKMARK_ENTITIES: FileVariantEntity[] = bookmarks.map(
  (bookmark) => {
    return {
      color: '',
      icon: '',
      id: bookmark.id,
      label: bookmark.label,
      shareUrl: '',
    };
  }
);
