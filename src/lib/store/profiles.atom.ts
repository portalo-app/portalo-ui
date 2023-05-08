import { atom } from 'recoil';
import { Profile, mockProfiles } from '../model/profile';
import { localStorageEffect } from './localStorageEffect.util';

export const profilesState = atom<Profile[]>({
  key: 'profilesState',
  default: mockProfiles,
  effects: [localStorageEffect('profiles')],
});
