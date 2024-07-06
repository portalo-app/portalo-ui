import { FileVariantEntity } from '@models/business/file/fileVariant';

const socialMediaApplications = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0077b5',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    color: '#1877f2',
  },
  {
    id: 'youtube',
    label: 'Youtube',
    color: '#ff0000',
  },
  {
    id: 'x',
    label: 'X',
    color: '#000000',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    color: '#3b5998',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#ff4500',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#000000',
  },
];

export const MEDIA_ENTITIES: FileVariantEntity[] = socialMediaApplications.map(
  (app) => ({
    label: app.label,
    id: app.id,
    color: app.color,
    icon: `social-media/${app.id}.webp`,
    validationRegex: new RegExp(`https:\/\/www.${app.id}.com\/.*`),
  })
);
