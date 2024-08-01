import { FileVariantEntity } from '@models/business/file/fileVariant';

const bookmarks = [
  {
    id: 'web',
    label: 'Web',
    color: '',
    icon: 'https://img.icons8.com/color/48/internet--v1.png',
    shareUrl: '',
  },
  {
    id: 'news',
    label: 'News',
    color: '',
    icon: 'https://img.icons8.com/color/48/headline.png',
    shareUrl: '',
  },
  {
    id: 'music',
    label: 'Music',
    color: '',
    icon: 'https://img.icons8.com/color/48/apple-music.png',
    shareUrl: '',
  },
  {
    id: 'documents',
    label: 'Documents/Articles',
    color: '',
    icon: 'https://img.icons8.com/color/48/document--v1.png',
    shareUrl: '',
  },
  {
    id: 'education',
    label: 'Education',
    color: '',
    icon: 'https://img.icons8.com/color/48/graduation-cap.png',
    shareUrl: '',
  },
  {
    id: 'events',
    label: 'Events',
    color: '',
    icon: 'https://img.icons8.com/color/48/calendar--v1.png',
    shareUrl: '',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    color: '',
    icon: 'https://img.icons8.com/color/48/shopping-cart-loaded.png',
    shareUrl: '',
  },
  {
    id: 'trips',
    label: 'Trips',
    color: '',
    icon: 'https://img.icons8.com/color/48/suitcase.png',
    shareUrl: '',
  },
  {
    id: 'health',
    label: 'Health',
    color: '',
    icon: 'https://img.icons8.com/color/48/doctors-bag.png',
    shareUrl: '',
  },
  {
    id: 'home',
    label: 'Home',
    color: '',
    icon: 'https://img.icons8.com/color/48/home--v1.png',
    shareUrl: '',
  },
  {
    id: 'recipe',
    label: 'Recipe',
    color: '',
    icon: 'https://img.icons8.com/color/48/ingredients.png',
    shareUrl: '',
  },
  {
    id: 'finance',
    label: 'Finance',
    color: '',
    icon: 'https://img.icons8.com/color/48/money-bag.png',
    shareUrl: '',
  },
];

export const BOOKMARK_ENTITIES: FileVariantEntity[] = bookmarks.map(
  (bookmark) => {
    return {
      color: '',
      icon: bookmark.icon!,
      iconIsUrl: true,
      id: bookmark.id,
      label: bookmark.label,
      shareUrl: '',
    };
  }
);
