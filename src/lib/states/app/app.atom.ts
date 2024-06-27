import { atom } from 'recoil';
import { DEFAULT_FOLDERS } from './app.data';

export const globalStateFolder = atom({
  key: 'globalStateFolder',
  default: DEFAULT_FOLDERS,
});
