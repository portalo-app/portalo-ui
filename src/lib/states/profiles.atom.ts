import { CLIENT_STORAGE_PROFILES } from '@constants/constants.const';
import { ProfileDTO } from '@models/dto/profile.dto';
import { atom } from 'recoil';
import { localStorageEffect } from './clientStorageEffect.util';

export const profilesState = atom<ProfileDTO[]>({
  key: 'profilesState',
  default: [],
  effects: [localStorageEffect(CLIENT_STORAGE_PROFILES)],
});
