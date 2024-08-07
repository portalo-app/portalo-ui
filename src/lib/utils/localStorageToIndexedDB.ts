import localforage from 'localforage';

localforage.config({
  name: 'portaloStorage',
  storeName: 'portaloStorage',
  version: 1.0,
  description: 'Portalo Storage',
  size: 5 * 1024 * 1024, // Size of the database in bytes (5 MB )
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE], // Preferred storage drivers in order
});

export const localStorageToIndexedDB = (storage: string) => {
  const data = localStorage.getItem(storage);

  if (!data) return;

  localforage
    .setItem(storage, data)
    .then(() => {
      localStorage.removeItem(storage);
    })
    .catch((err) => {
      console.error(err);
    });
};
