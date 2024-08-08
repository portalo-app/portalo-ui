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

export const indexeddbToLocalstorage = () => {
  const profile = localforage.getItem(CLIENT_STORAGE_PROFILES);
  const shortcuts = localforage.getItem(CLIENT_STORAGE_SHORTCUTS);

  const localforageData = [
    {
      key: CLIENT_STORAGE_PROFILES,
      value: profile,
    },
    {
      key: CLIENT_STORAGE_SHORTCUTS,
      value: shortcuts,
    },
  ];

  localforageData.forEach(({ key, value }) => {
    if (!value) return;

    localStorage.setItem(key, JSON.stringify(value));

    localforage
      .removeItem(key)
      .then(() => {
        console.log('Key is cleared!');
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
