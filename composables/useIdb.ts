export const useMdNotes = () => {
  const dbPromise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open('mdNotes', 1)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest)?.result
      db.createObjectStore('mdNotes', { keyPath: 'id' })
    }

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result as IDBDatabase)
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error)
    }
  })

  const getNotes = async (): Promise<Note[]> => {
    const db: IDBDatabase = await dbPromise
    const tx: IDBTransaction = db.transaction('mdNotes', 'readonly')
    const store: IDBObjectStore = tx.objectStore('mdNotes')

    return new Promise<Note[]>((resolve, reject) => {
      const request: IDBRequest = store.getAll()

      request.onsuccess = (event: Event) => {
        const data: Note[] = (event.target as IDBRequest).result as Note[]
        const sortedNotes = () => {
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

        sortedNotes()
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const getNote = async (id: string): Promise<Note | undefined> => {
    const db: IDBDatabase = await dbPromise
    const tx: IDBTransaction = db.transaction('mdNotes', 'readonly')
    const store: IDBObjectStore = tx.objectStore('mdNotes')

    return new Promise<Note | undefined>((resolve, reject) => {
      const request: IDBRequest = store.get(id)

      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result as Note)
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const saveNote = async (note: Note): Promise<void> => {
    const db: IDBDatabase = await dbPromise
    const tx: IDBTransaction = db.transaction('mdNotes', 'readwrite')
    const store: IDBObjectStore = tx.objectStore('mdNotes')

    return new Promise<void>((resolve, reject) => {
      const request: IDBRequest = store.put(note)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const addNote = async (note: Note): Promise<void> => {
    const db: IDBDatabase = await dbPromise
    const tx: IDBTransaction = db.transaction('mdNotes', 'readwrite')
    const store: IDBObjectStore = tx.objectStore('mdNotes')

    return new Promise<void>((resolve, reject) => {
      const request: IDBRequest = store.add(note)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const deleteNote = async (id: string): Promise<void> => {
    const db: IDBDatabase = await dbPromise
    const tx: IDBTransaction = db.transaction('mdNotes', 'readwrite')
    const store: IDBObjectStore = tx.objectStore('mdNotes')

    return new Promise<void>((resolve, reject) => {
      const request: IDBRequest = store.delete(id)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  return { getNotes, getNote, saveNote, addNote, deleteNote }
}
