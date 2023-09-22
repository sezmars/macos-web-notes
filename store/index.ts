import { defineStore } from 'pinia'

import { Common } from '~/utils/enums'

export const useStore = defineStore('store', () => {
  const noteTitle = ref(Common.newNote as string)
  const rawText = ref('')
  const parsedText = ref('')
  const isPreviewActive = ref(false)
  const notes = ref<Note[]>([])
  const currentNoteId = ref('')
  const currentNoteUpdateDate = ref('')

  const setCurrentNote = (id: string) => {
    const note = notes.value.find(note => note.id === id)
    if (note) {
      currentNoteId.value = note.id
      noteTitle.value = note.title
      rawText.value = note.content
      currentNoteUpdateDate.value = note.updated
    }
  }

  const initStoreNotes = async () => {
    notes.value = await getNotesFromDb()
  }

  const searchNotes = async (q: string) => {
    const prepareQ = q.toLowerCase().trim()

    const notesFormDb = await getNotesFromDb()

    notes.value = notesFormDb.filter((note: Note) => (note.title.toLowerCase().includes(prepareQ) || note.content.toLowerCase().includes(prepareQ)) && note)
  }

  const saveNote = async () => {
    const { id } = useQueryId()

    const note: Note = notes.value.find(
      (note: Note) => note.id === id.value
    )!

    const noteObj: Note = {
      id: '',
      title: formatTitle(rawText.value) || noteTitle.value,
      content: rawText.value,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    }

    if (note) {
      noteObj.id = note.id
      noteObj.created = note.created
      await saveNoteFromDb(noteObj)
    }

    notes.value = await getNotesFromDb()
  }

  const createNote = async () => {
    const noteObj: Note = {
      id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
      title: Common.newNote as string,
      content: ' ',
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    }

    await addNoteToDb(noteObj)

    notes.value = await getNotesFromDb()

    setCurrentNote(noteObj.id)
    await navigateCurrentNote(noteObj.id)
  }

  const removeNote = async (id: string) => {
    await deleteNoteFromDb(id)

    notes.value = await getNotesFromDb()

    noteTitle.value = Common.newNote
    rawText.value = ''
  }

  const getNotesLength = () => {
    return notes.value && notes.value.length > 0
  }

  const navigateCurrentNote = async (id?: string) => {
    await navigateTo({
      path: '/',
      query: id
        ? {
            note: id
          }
        : {}
    })
  }

  return {
    rawText,
    parsedText,
    noteTitle,
    isPreviewActive,
    currentNoteId,
    currentNoteUpdateDate,
    notes,
    saveNote,
    createNote,
    setCurrentNote,
    navigateCurrentNote,
    getNotesLength,
    initStoreNotes,
    searchNotes,
    removeNote
  }
})
