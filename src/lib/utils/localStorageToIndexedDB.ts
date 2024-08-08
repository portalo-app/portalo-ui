import {
  CLIENT_STORAGE_PROFILES,
  CLIENT_STORAGE_SHORTCUTS,
} from '@constants/constants.const';
import localforage from 'localforage';

localforage.config({
  name: 'portaloStorage',
  storeName: 'portaloStorage',
  version: 1.0,
  description: 'Portalo Storage',
  size: 5 * 1024 * 1024, // Size of the database in bytes (5 MB )
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE], // Preferred storage drivers in order
});

export const localStorageToIndexedDB = () => {
  const profile = localStorage.getItem(CLIENT_STORAGE_PROFILES);
  const shortcuts = localStorage.getItem(CLIENT_STORAGE_SHORTCUTS);

  const localstorageData = [
    {
      key: CLIENT_STORAGE_PROFILES,
      value: profile,
    },
    {
      key: CLIENT_STORAGE_SHORTCUTS,
      value: shortcuts,
    },
  ];

  localstorageData.forEach(({ key, value }) => {
    if (!value) return;

    localforage
      .setItem(key, value)
      .then(() => {
        localStorage.removeItem(key);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
