import { ProfileDTO } from '@models/dto/profile.dto';
import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect.util';

export const profilesState = atom<ProfileDTO[]>({
  key: 'profilesState',
  default: [],
  effects: [localStorageEffect('portalo.profiles')],
});
