import { Entity } from '@models/business/file';

export const MEDIA_ENTITIES: Entity[] = [
  {
    label: 'LinkedIn',
    value: 'LINKEDIN',
    icon: 'linkedin',
    color: '#0077b5',
    validationRegex: /https:\/\/www.linkedin.com\/.*/,
  },
  {
    label: 'Facebook',
    value: 'FACEBOOK',
    icon: 'facebook',
    color: '#1877f2',
    validationRegex: /https:\/\/www.facebook.com\/.*/,
  },
  {
    label: 'Youtube',
    value: 'YOUTUBE',
    icon: 'youtube',
    color: '#ff0000',
    validationRegex: /https:\/\/www.youtube.com\/.*/,
  },
  {
    color: '#1e88e5',
    icon: 'twitter',
    value: 'TWITTER',
    label: 'Twitter',
    validationRegex: /https:\/\/twitter.com\/.*/,
  },
  {
    color: '#3b5998',
    icon: 'reddit',
    value: 'REDDIT',
    label: 'Reddit',
    validationRegex: /https:\/\/www.reddit.com\/.*/,
  },
  {
    color: '#ff4500',
    icon: 'instagram',
    value: 'INSTAGRAM',
    label: 'Instagram',
    validationRegex: /https:\/\/www.instagram.com\/.*/,
  },
  {
    label: 'TikTok',
    value: 'TIKTOK',
    icon: 'tiktok',
    color: '#000000',
    validationRegex: /https:\/\/www.tiktok.com\/.*/,
  },
];
