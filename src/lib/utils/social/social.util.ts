import { FileVariantEntity } from '@models/business/file/fileVariant';

export const getSocialUrlByUsername = (
  entity: FileVariantEntity,
  username: string
): string => {
  switch (entity.id) {
    case 'whatsapp':
      return `https://wa.me/${username}`;
    case 'telegram':
      return `https://t.me/${username}`;
    case 'skype':
      return `https://join.skype.com/${username}`;
    case 'gmail':
      return `https://mail.google.com/${username}`;
    case 'discord':
      return `https://discord.com/${username}`;
    case 'linkedin':
      return `https://www.linkedin.com/in/${username}`;
    case 'facebook':
      return `https://www.facebook.com/${username}`;
    case 'youtube':
      return `https://www.youtube.com/${username}`;
    case 'twitter':
      return `https://twitter.com/${username}`;
    case 'reddit':
      return `https://www.reddit.com/user/${username}`;
    case 'instagram':
      return `https://www.instagram.com/${username}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${username}`;
    default:
      return '';
  }
};
