import { Entity } from '@models/business/file';

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
