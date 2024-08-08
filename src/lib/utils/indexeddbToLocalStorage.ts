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

export const indexeddbToLocalstorage = async () => {
  const profile = await localforage.getItem(CLIENT_STORAGE_PROFILES);
  const shortcuts = await localforage.getItem(CLIENT_STORAGE_SHORTCUTS);

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

  console.log('IndexedDB to LocalStorage', localforageData);
  localforageData.forEach(({ key, value }) => {
    const stringifiedValue = JSON.stringify(value);

    if (!stringifiedValue || stringifiedValue === 'null') return;

    localStorage.setItem(key, stringifiedValue);

    // localforage.removeItem(key);
  });
};
