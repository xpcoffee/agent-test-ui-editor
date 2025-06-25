import { openDB } from 'idb';

const dbPromise = openDB('pages-db', 1, {
  upgrade(db) {
    db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
  },
});

export const addPage = async (page: { title: string; content: string }) => {
  const db = await dbPromise;
  await db.add('pages', page);
};

export const getAllPages = async () => {
  const db = await dbPromise;
  return db.getAll('pages');
};
