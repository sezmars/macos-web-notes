<script lang="ts" setup>
const { saveNote, createNote, getQueryId } = useStore()
const { rawText } = storeToRefs(useStore())

const createNewNote = async () => {
  if (getQueryId()) {
    return
  }

  await createNote()
}

const textarea = ref(null)

onMounted(() => {
  if (textarea && textarea.value) {
    (textarea.value as HTMLTextAreaElement).focus()
  }
})
</script>

<template>
  <div class="editor d-flex flex-column">
    <textarea
      ref="textarea"
      v-model="rawText"
      class="editor__area"
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
    resize: none;

    @include font(1.4rem, 1.6rem);
  }
}
</style>
