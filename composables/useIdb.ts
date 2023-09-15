import { openDB } from "idb";

export const useMdNotes = () => {
  const dbPromise = openDB("mdNotes", 1, {
    upgrade(db) {
      db.createObjectStore("mdNotes", { keyPath: "id" });
    },
  });

  const getNotes = async () => {
    const db = await dbPromise;
    const tx = db.transaction("mdNotes", "readonly");
    const store = tx.objectStore("mdNotes");
    return await store.getAll();
  };

  const getNote = async (id: string) => {
    const db = await dbPromise;
    const tx = db.transaction("mdNotes", "readonly");
    const store = tx.objectStore("mdNotes");
    return await store.get(id);
  };

  const saveNote = async (note: Note) => {
    const db = await dbPromise;
    const tx = db.transaction("mdNotes", "readwrite");
    const store = tx.objectStore("mdNotes");
    await store.put(note);
  };

  const addNote = async (note: Note) => {
    const db = await dbPromise;
    const tx = db.transaction("mdNotes", "readwrite");
    const store = tx.objectStore("mdNotes");
    await store.add(note);
  };

  const deleteNote = async (id: string) => {
    const db = await dbPromise;
    const tx = db.transaction("mdNotes", "readwrite");
    const store = tx.objectStore("mdNotes");
    await store.delete(id);
  };

  return { getNotes, getNote, saveNote, addNote, deleteNote };
};
