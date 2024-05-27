import { atom } from 'recoil';
import { Space } from '../models/space';
import { localStorageEffect } from './localStorageEffect.util';

export const spacesState = atom<Space[]>({
  key: 'spacesState',
  default: [],
  effects: [localStorageEffect('portalo.spaces')],
});
