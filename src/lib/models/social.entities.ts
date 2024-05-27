import { Entity } from './space';

export const MESSAGING_ENTITIES: Entity[] = [
  {
    label: 'WhatsApp',
    value: 'WHATSAPP',
    icon: 'whatsapp',
    color: '#25d366',
    validationRegex: /https:\/\/web.whatsapp.com\/.*/,
    defaultTags: [],
  },
  {
    label: 'Telegram',
    value: 'TELEGRAM',
    icon: 'telegram',
    color: '#0088cc',
    validationRegex: /https:\/\/t.me\/.*/,
    defaultTags: [],
  },
  {
    label: 'Skype',
    value: 'SKYPE',
    icon: 'skype',
    color: '#00aff0',
    validationRegex: /https:\/\/join.skype.com\/.*/,
    defaultTags: [],
  },
  {
    label: 'Discord',
    value: 'DISCORD',
    icon: 'discord',
    color: '#7289da',
    validationRegex: /https:\/\/discord.com\/.*/,
    defaultTags: [],
  },
  {
    label: 'Gmail',
    value: 'GMAIL',
    icon: 'gmail',
    color: '#d14836',
    validationRegex: /https:\/\/mail.google.com\/.*/,
    defaultTags: [],
  },
];

export const MEDIA_ENTITIES: Entity[] = [
  {
    label: 'LinkedIn',
    value: 'LINKEDIN',
    icon: 'linkedin',
    color: '#0077b5',
    validationRegex: /https:\/\/www.linkedin.com\/.*/,
    defaultTags: [],
  },
  {
    label: 'Facebook',
    value: 'FACEBOOK',
    icon: 'facebook',
    color: '#1877f2',
    validationRegex: /https:\/\/www.facebook.com\/.*/,
    defaultTags: [],
  },
  {
    label: 'Youtube',
    value: 'YOUTUBE',
    icon: 'youtube',
    color: '#ff0000',
    validationRegex: /https:\/\/www.youtube.com\/.*/,
    defaultTags: [],
  },
  {
    color: '#1e88e5',
    icon: 'twitter',
    value: 'TWITTER',
    label: 'Twitter',
    validationRegex: /https:\/\/twitter.com\/.*/,
    defaultTags: [],
  },
  {
    color: '#3b5998',
    icon: 'reddit',
    value: 'REDDIT',
    label: 'Reddit',
    validationRegex: /https:\/\/www.reddit.com\/.*/,
    defaultTags: [],
  },
  {
    color: '#ff4500',
    icon: 'instagram',
    value: 'INSTAGRAM',
    label: 'Instagram',
    validationRegex: /https:\/\/www.instagram.com\/.*/,
    defaultTags: [],
  },
  {
    label: 'TikTok',
    value: 'TIKTOK',
    icon: 'tiktok',
    color: '#000000',
    validationRegex: /https:\/\/www.tiktok.com\/.*/,
    defaultTags: [],
  },
];

export const getSocialUrlByUsername = (
  entity: Entity,
  username: string
): string => {
  switch (entity.value) {
    case 'WHATSAPP':
      return `https://wa.me/${username}`;
    case 'TELEGRAM':
      return `https://t.me/${username}`;
    case 'SKYPE':
      return `https://join.skype.com/${username}`;
    case 'GMAIL':
      return `https://mail.google.com/${username}`;
    case 'DISCORD':
      return `https://discord.com/${username}`;
    case 'LINKEDIN':
      return `https://www.linkedin.com/in/${username}`;
    case 'FACEBOOK':
      return `https://www.facebook.com/${username}`;
    case 'YOUTUBE':
      return `https://www.youtube.com/${username}`;
    case 'TWITTER':
      return `https://twitter.com/${username}`;
    case 'REDDIT':
      return `https://www.reddit.com/user/${username}`;
    case 'INSTAGRAM':
      return `https://www.instagram.com/${username}`;
    case 'TIKTOK':
      return `https://www.tiktok.com/@${username}`;
    default:
      return '';
  }
};
