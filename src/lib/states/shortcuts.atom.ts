import { CLIENT_STORAGE_SHORTCUTS } from '@constants/constants.const';
import { atom } from 'recoil';
import { localStorageEffect } from './clientStorageEffect.util';

export const shortcutsState = atom({
  key: 'shortcutsState',
  default: [],
  effects: [localStorageEffect(CLIENT_STORAGE_SHORTCUTS)],
});
