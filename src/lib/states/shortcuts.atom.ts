import { CLIENT_STORAGE_SHORTCUTS } from '@constants/constants.const';
import { atom } from 'recoil';
import { clientStorageEffect } from './localStorageEffect.util';

export const shortcutsState = atom({
  key: 'shortcutsState',
  default: [],
  effects: [clientStorageEffect(CLIENT_STORAGE_SHORTCUTS)],
});
