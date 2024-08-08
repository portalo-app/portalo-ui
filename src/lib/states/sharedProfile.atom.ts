import { CLIENT_STORAGE_SHARED_PROFILE } from '@constants/constants.const';
import { ProfileDTO } from '@models/dto/profile.dto';
import { atom } from 'recoil';
import { localStorageEffect } from './clientStorageEffect.util';

export const sharedProfileState = atom<ProfileDTO>({
  key: 'sharedProfileState',
  effects: [localStorageEffect(CLIENT_STORAGE_SHARED_PROFILE)],
});
