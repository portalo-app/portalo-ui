import { ProfileDTO } from '@models/dto/profile.dto';

const NEOPOWER_PROFILE: ProfileDTO = {
  id: 'neopower',
  name: 'NeoPower',
  description: 'Web3 software company building products for humans',
  icon: '/neopower.svg',
  folders: [
    {
      id: 'social',
      folderTypeId: 'social',
      files: [
        {
          data: {
            variant: 'social-media',
            entity: 'x',
            username: 'NeoPowerDigital',
          },
          id: 'social_media_x',
        },
        {
          data: {
            variant: 'messaging',
            entity: 'gmail',
            username: 'contact@neopower.digital',
          },
          id: 'social_messaging_gmail',
        },
        {
          data: {
            variant: 'social-media',
            entity: 'company_linkedin',
            username: 'neopowerdigital',
          },
          id: 'social_social-media_linkedin',
        },
        {
          data: {
            variant: 'messaging',
            entity: 'telegram',
            username: '@briansasbon',
          },
          id: 'social_messaging_telegram',
        },
        {
          data: {
            variant: 'social-media',
            entity: 'x',
            username: 'argiefy',
          },
          id: 'social_media_x_2',
        },
        {
          data: {
            variant: 'social-media',
            entity: 'x',
            username: 'portaloapp',
          },
          id: 'social_media_x_2',
        },
      ],
    },
    {
      id: 'bookmark',
      folderTypeId: 'bookmark',
      files: [
        {
          data: {
            variant: 'bookmark',
            entity: 'web',
            url: 'https://neopower.digital/',
            title: 'Argiefy',
          },
          id: 'bookmark_bookmark_web_1',
        },
        {
          data: {
            variant: 'bookmark',
            entity: 'web',
            url: 'https://argiefy.com/',
            title: 'Argiefy',
          },
          id: 'bookmark_bookmark_web_1',
        },
        {
          data: {
            variant: 'bookmark',
            entity: 'web',
            url: 'https://portalo.xyz/',
            title: 'Portalo',
          },
          id: 'bookmark_bookmark_web_1',
        },
      ],
    },
  ],
};

const CRECIMIENTO_PROFILE: ProfileDTO = {
  id: 'crecimiento',
  name: 'Crecimiento',
  icon: '/assets/icons/profiles/crecimiento.svg',
  description: `A movement transforming Argentina into the world's first crypto nation`,
  folders: [
    {
      id: 'social',
      folderTypeId: 'social',
      files: [
        {
          data: {
            variant: 'social-media',
            entity: 'x',
            username: 'crecimientoar',
          },
          id: 'social_social-media_x',
        },
        {
          data: {
            variant: 'social-media',
            entity: 'instagram',
            username: 'crecimiento.build',
          },
          id: 'social_social-media_instagram',
        },
        {
          data: {
            variant: 'social-media',
            entity: 'company_linkedin',
            username: 'crecimientobuild',
          },
          id: 'social_social-media_linkedin',
        },

        {
          data: {
            variant: 'messaging',
            entity: 'warpcast',
            username: 'crecimiento',
          },
          id: 'social_messaging_warpcast',
        },
      ],
    },
    {
      id: 'address',
      folderTypeId: 'address',
      files: [],
    },
    {
      id: 'bookmark',
      folderTypeId: 'bookmark',
      files: [
        {
          data: {
            variant: 'bookmark',
            entity: 'web',
            url: 'https://www.aleph.crecimiento.build/',
            title: 'Aleph Landing',
          },
          id: 'bookmark_bookmark_web_1722988950016',
        },
        {
          data: {
            variant: 'bookmark',
            entity: 'events',
            url: 'https://aleph.sola.day/',
            title: 'Aleph Social Layer',
          },
          id: 'bookmark_bookmark_events_1722988991759',
        },
        {
          data: {
            variant: 'bookmark',
            entity: 'documents',
            url: 'https://docs.google.com/presentation/d/1jBVM1RkcswT6hedSpNqtatH4Ky-PvIsKPCvvAFOnA6U/edit#slide=id.g2157829634c_2_29',
            title: 'Welcome Guide',
          },
          id: 'bookmark_bookmark_documents_1722989015234',
        },
        {
          data: {
            variant: 'bookmark',
            entity: 'documents',
            url: 'https://docs.google.com/presentation/d/1LyanXVdKJHfq95qvSSxJwQIgS5mCfIUi8SuY3vAkznQ/edit#slide=id.g21ba7f15b38_24_143',
            title: 'Guía de Bienvenida',
          },
          id: 'bookmark_bookmark_documents_1722989049008',
        },
        {
          data: {
            variant: 'bookmark',
            entity: 'news',
            url: 'https://estoescrecimiento.substack.com/',
            title: "Crecimiento's Blog",
          },
          id: 'bookmark_bookmark_news_1722989130749',
        },
      ],
    },
  ],
};

export const RECOMMENDED_PROFILES = [CRECIMIENTO_PROFILE, NEOPOWER_PROFILE];
