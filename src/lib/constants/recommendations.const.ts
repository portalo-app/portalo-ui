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
            variant: 'messaging',
            entity: 'telegram',
            username: '@briansasbon',
          },
          id: 'social_messaging_telegram',
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
            variant: 'media',
            entity: 'x',
            username: 'NeoPowerDigital',
          },
          id: 'social_media_x',
        },
        {
          data: {
            variant: 'media',
            entity: 'x',
            username: 'LaMultisig',
          },
          id: 'social_media_x_2',
        },
      ],
    },
    {
      id: 'address',
      folderTypeId: 'address',
      files: [
        {
          data: {
            variant: 'crypto',
            entity: 'ATOM',
            address: 'cosmos1ct4d6m6av7w25ygcrtnx00r2ezrklh9rgc3wmk',
            name: 'NeoPower Cosmos wallet',
          },
          id: 'address_crypto_ATOM',
        },
        {
          data: {
            variant: 'crypto',
            entity: 'MATIC',
            address: '0x39bcd81c6db7f3672a1a0e8e08e3c3a5d93d03ff',
            name: 'NeoPower Polygon wallet',
          },
          id: 'address_crypto_MATIC',
        },
      ],
    },
  ],
};

export const RECOMMENDED_PROFILES = [NEOPOWER_PROFILE];
