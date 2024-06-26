import { Entity } from '@models/business/file';

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
