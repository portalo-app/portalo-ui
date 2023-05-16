import { atom } from 'recoil';
import { Profile } from '../model/profile';
import { localStorageEffect } from './localStorageEffect.util';

export const profilesState = atom<Profile[]>({
  key: 'profilesState',
  default: [],
  effects: [localStorageEffect('profiles')],
});
