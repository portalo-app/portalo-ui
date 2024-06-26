import { atom } from 'recoil';
import { Profile } from '../models/business/profile';
import { localStorageEffect } from './localStorageEffect.util';

export const profilesState = atom<Profile[]>({
  key: 'profilesState',
  default: [],
  effects: [localStorageEffect('portalo.profiles')],
});
