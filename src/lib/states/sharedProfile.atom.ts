import { CLIENT_STORAGE_SHARED_PROFILE } from '@constants/constants.const';
import { ProfileDTO } from '@models/dto/profile.dto';
import { atom } from 'recoil';
import { clientStorageEffect } from './localStorageEffect.util';

export const sharedProfileState = atom<ProfileDTO>({
  key: 'sharedProfileState',
  effects: [clientStorageEffect(CLIENT_STORAGE_SHARED_PROFILE)],
});
