import { ProfileDTO } from '@models/dto/profile.dto';
import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect.util';

export const sharedProfileState = atom<ProfileDTO>({
  key: 'sharedProfileState',
  effects: [localStorageEffect('portalo.sharedProfile')],
});
