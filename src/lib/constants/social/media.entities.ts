import { FileVariantEntity } from '@models/business/file/fileVariant';

const socialMediaApplications = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0077b5',
    shareUrl: 'https://www.linkedin.com/in/',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    color: '#1877f2',
    shareUrl: 'https://www.facebook.com/',
  },
  {
    id: 'youtube',
    label: 'Youtube',
    color: '#ff0000',
    shareUrl: 'https://www.youtube.com/',
  },
  {
    id: 'x',
    label: 'X',
    color: '#000000',
    shareUrl: 'https://www.x.com/',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    color: '#3b5998',
    shareUrl: 'https://www.reddit.com/user/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#ff4500',
    shareUrl: 'https://www.instagram.com/',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#000000',
    shareUrl: 'https://www.tiktok.com/@',
  },
];

export const MEDIA_ENTITIES: FileVariantEntity[] = socialMediaApplications.map(
  (app) => ({
    label: app.label,
    id: app.id,
    color: app.color,
    icon: `social-media/${app.id}.webp`,
    shareUrl: app.shareUrl,
  })
);
