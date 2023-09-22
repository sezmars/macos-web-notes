let cachedDb: IDBDatabase | null = null

const useMdNotesFromDb = (): Promise<IDBDatabase> => {
  if (cachedDb) {
    return Promise.resolve(cachedDb)
  }

  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open('mdNotes', 1)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest)?.result
      db.createObjectStore('mdNotes', { keyPath: 'id' })
    }

    request.onsuccess = (event: Event) => {
      cachedDb = (event.target as IDBOpenDBRequest).result as IDBDatabase
      resolve(cachedDb)
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error)
    }
  })
}

const getNotesFromDb = async (): Promise<Note[]> => {
  const db: IDBDatabase = await useMdNotesFromDb()
  const tx: IDBTransaction = db.transaction('mdNotes', 'readonly')
  const store: IDBObjectStore = tx.objectStore('mdNotes')

  return new Promise((resolve, reject) => {
    const request: IDBRequest = store.getAll()

    request.onsuccess = (event: Event) => {
      const data: Note[] = (event.target as IDBRequest).result as Note[]

      if (data.length) {
        data.sort(
          (a: Note, b: Note) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime()
        )
        resolve(data)
      } else {
        resolve(data)
      }
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

const getNoteFromDb = async (id: string): Promise<Note | undefined> => {
  const db: IDBDatabase = await useMdNotesFromDb()
  const tx: IDBTransaction = db.transaction('mdNotes', 'readonly')
  const store: IDBObjectStore = tx.objectStore('mdNotes')

  return new Promise((resolve, reject) => {
    const request: IDBRequest = store.get(id)

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest).result as Note)
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

const saveNoteFromDb = async (note: Note): Promise<void> => {
  const db: IDBDatabase = await useMdNotesFromDb()
  const tx: IDBTransaction = db.transaction('mdNotes', 'readwrite')
  const store: IDBObjectStore = tx.objectStore('mdNotes')

  return new Promise((resolve, reject) => {
    const request: IDBRequest = store.put(note)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

const addNoteToDb = async (note: Note): Promise<void> => {
  const db: IDBDatabase = await useMdNotesFromDb()
  const tx: IDBTransaction = db.transaction('mdNotes', 'readwrite')
  const store: IDBObjectStore = tx.objectStore('mdNotes')

  return new Promise((resolve, reject) => {
    const request: IDBRequest = store.add(note)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

const deleteNoteFromDb = async (id: string): Promise<void> => {
  const db: IDBDatabase = await useMdNotesFromDb()
  const tx: IDBTransaction = db.transaction('mdNotes', 'readwrite')
  const store: IDBObjectStore = tx.objectStore('mdNotes')

  return new Promise((resolve, reject) => {
    const request: IDBRequest = store.delete(id)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

export { addNoteToDb, deleteNoteFromDb, getNoteFromDb, getNotesFromDb, saveNoteFromDb }
