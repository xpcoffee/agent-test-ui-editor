import { openDB } from 'idb';

export interface Page {
    id: number;
    title: string;
    paragraphs: string[];
}

const dbPromise = openDB<Page>('pages-db', 1, {
  upgrade(db) {
    db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
  },
});

export const addPage = async (page: Omit<Page, 'id'>) => {
  const db = await dbPromise;
  return db.add('pages', page as Page);
};

export const getAllPages = async () => {
  const db = await dbPromise;
  return db.getAll('pages');
};

export const getPage = async (id: number) => {
    const db = await dbPromise;
    return db.get('pages', id);
}
