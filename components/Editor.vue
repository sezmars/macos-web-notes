<script lang="ts" setup>
const { saveNote, createNote } = useStore()
const { rawText } = storeToRefs(useStore())

const createNewNote = async () => {
  const { id } = useQueryId()

  if (id.value) {
    return
  }

  await createNote()
}

const textarea = ref()
const route = useRoute()

let hilite: TextAreaHighlight

onUpdated(() => {
  setTimeout(() => {
    const searchResult = route.query.q
    const sens = false // Case sensitive. Optional, default: false
    const word = false // Perform a words only search. Optional, default: false

    hilite?.search(searchResult?.toString() || '', sens, word)
  }, 10)
})

onMounted(() => {
  if (textarea && textarea.value) {
    (textarea.value as HTMLTextAreaElement).focus()

    hilite = new TextAreaHighlight(textarea.value)
  }
})
</script>

<template>
  <div class="editor d-flex flex-column">
    <textarea
      ref="textarea"
      v-model="rawText"
      class="editor__area"
      spellcheck="false"
      @input="saveNote(); createNewNote()"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor {
  overflow: auto;
  height: 100%;
  margin-top: 10px;

  &__area {
    flex: 1;
    padding: 0.9rem 1.6rem;
    background-color: var(--bg-color);
    color: var(--header-text-color);
    overflow: auto;

    border: none;
    outline: none;
    resize: both;

    height: calc(100vh - 50px);;
    width: calc(100% - 34px);

    @include font(1.4rem, 1.6rem);
  }
}
</style>
