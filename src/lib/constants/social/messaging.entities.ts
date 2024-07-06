import { FileVariantEntity } from '@models/business/file/fileVariant';

const messagingApplications = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    color: '#25d366',
    url: 'https://web.whatsapp.com/',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    color: '#0088cc',
    url: 'https://t.me/',
  },
  {
    id: 'skype',
    label: 'Skype',
    color: '#00aff0',
    url: 'https://join.skype.com/',
  },
  {
    id: 'discord',
    label: 'Discord',
    color: '#7289da',
    url: 'https://discord.com/',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    color: '#d14836',
    url: 'https://mail.google.com/',
  },
];

export const MESSAGING_ENTITIES: FileVariantEntity[] =
  messagingApplications.map((app) => ({
    label: app.label,
    id: app.id,
    icon: `messaging/${app.id}.webp`,
    color: app.color,
    validationRegex: new RegExp(`${app.url}.*`),
  }));
