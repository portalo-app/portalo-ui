import { atom } from 'recoil';

export const walletState = atom<string>({
  key: 'walletState',
  default: '',
});
