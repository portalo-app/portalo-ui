import { CLIENT_STORAGE_PROFILES } from '@constants/constants.const';
import { ProfileDTO } from '@models/dto/profile.dto';
import { atom } from 'recoil';
import { clientStorageEffect } from './localStorageEffect.util';

export const profilesState = atom<ProfileDTO[]>({
  key: 'profilesState',
  default: [],
  effects: [clientStorageEffect(CLIENT_STORAGE_PROFILES)],
});
