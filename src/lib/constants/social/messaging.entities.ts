import { FileVariantEntity } from '@models/business/file/fileVariant';

const messagingApplications = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    color: '#25d366',
    shareUrl: 'https://wa.me/',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    color: '#0088cc',
    shareUrl: 'https://t.me/',
  },
  {
    id: 'skype',
    label: 'Skype',
    color: '#00aff0',
    shareUrl: '',
  },
  {
    id: 'discord',
    label: 'Discord',
    color: '#7289da',
    shareUrl: '',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    color: '#d14836',
    shareUrl: 'mailto:',
  },
  {
    id: 'warpcast',
    label: 'Warpcast',
    color: '#5b0090',
    shareUrl: 'https://warpcast.com/',
  },
];

export const MESSAGING_ENTITIES: FileVariantEntity[] =
  messagingApplications.map((app) => ({
    label: app.label,
    id: app.id,
    icon: `messaging/${app.id}.webp`,
    color: app.color,
    shareUrl: app.shareUrl,
  }));
