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

  const initStoreNotes = async () => {
    const { getNotes } = useMdNotes()
    notes.value = await getNotes()
  }

  const saveNote = async () => {
    const { saveNote, getNotes } = useMdNotes()

    // check if note already exists
    const note: Note = notes.value.find(
      (note: Note) => note.id === getQueryId()
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
      await saveNote(noteObj)
    }

    notes.value = await getNotes()
  }

  const createNote = async () => {
    const { addNote, getNotes } = useMdNotes()

    const noteObj: Note = {
      id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
      title: Common.newNote as string,
      content: ' ',
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    }

    await addNote(noteObj)

    notes.value = await getNotes()

    setCurrentNote(noteObj.id)
    await navigateCurrentNote(noteObj.id)
  }
  const getNotesLength = () => {
    return notes.value && notes.value.length > 0
  }

  const getQueryId = () => {
    const route = useRoute()
    return route.query.note as string
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
    getQueryId,
    initStoreNotes
  }
})
