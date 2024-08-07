import localforage from 'localforage';
import { AtomEffect } from 'recoil';

const store = typeof window !== 'undefined' ? localforage : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const localStorageEffect: (key: string) => AtomEffect<any> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (store) {
      store
        .getItem(key)
        .then((value) => {
          setSelf(value || []);

          if (value != null) {
            // TODO: Validate the value before setting it.
            const parsedValue = JSON.parse(value as string);
            setSelf(parsedValue);
          }
        })
        .catch((err) => {
          console.error(err);
        });

      onSet((newValue, _, isReset) => {
        isReset ? store.removeItem(key) : store.setItem(key, newValue);
      });
    }
  };
