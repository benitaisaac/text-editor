import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  try {
    // Create a connection to the database and specify the database version we want to use
    const jateDb = await openDB('jate', 1);

    // Create a new transaction and specify the database and data privileges
    const tx = jateDb.transaction('jate', 'readwrite');

    // Open up the desired object store
    const store = tx.objectStore('contact');

    // Update the content in the object store
    await store.put(content);

    console.log('Data successfully updated in the database');
  } catch (error) {
    console.error('Error updating data in the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //Create a connection to the database and datavase version we want to use
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and specificy the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //Open up the desired object store
  const store = tx.objectStore('contact');

  //Use the .getAll() method to get all data in the database
  const request = store.getAll();

  //Get confirmation of request.
  const result = await request;
  console.log("result value", result);
  return result;
};

initdb();
