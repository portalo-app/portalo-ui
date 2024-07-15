import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect.util';

export const shortcutsState = atom({
  key: 'shortcutsState',
  default: [],
  effects: [localStorageEffect('portalo.shortcuts')],
});
