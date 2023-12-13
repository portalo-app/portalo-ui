import { AtomEffect } from 'recoil';

const store = typeof window !== 'undefined' ? window.localStorage : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const localStorageEffect: (key: string) => AtomEffect<any> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = store.getItem(key);

      if (savedValue != null) {
        // TODO: Validate the value before setting it.
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? store.removeItem(key)
          : store.setItem(key, JSON.stringify(newValue));
      });
    }
  };
