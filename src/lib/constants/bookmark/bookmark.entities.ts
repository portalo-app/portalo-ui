import { FileVariantEntity } from '@models/business/file/fileVariant';

const bookmarks = [
  {
    id: 'web',
    label: 'Web',
    color: '',
    shareUrl: '',
  },
  {
    id: 'news',
    label: 'News',
    color: '',
    shareUrl: '',
  },
  {
    id: 'music',
    label: 'Music',
    color: '',
    shareUrl: '',
  },
  {
    id: 'documents',
    label: 'Documents/Articles',
    color: '',
    shareUrl: '',
  },
  {
    id: 'education',
    label: 'Education',
    color: '',
    shareUrl: '',
  },
  {
    id: 'events',
    label: 'Events',
    color: '',
    shareUrl: '',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    color: '',
    shareUrl: '',
  },
  {
    id: 'trips',
    label: 'Trips',
    color: '',
    shareUrl: '',
  },
  {
    id: 'health',
    label: 'Health',
    color: '',
    shareUrl: '',
  },
  {
    id: 'home',
    label: 'Home',
    color: '',
    shareUrl: '',
  },
  {
    id: 'recipe',
    label: 'Recipe',
    color: '',
    shareUrl: '',
  },
  {
    id: 'finance',
    label: 'Finance',
    color: '',
    shareUrl: '',
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
