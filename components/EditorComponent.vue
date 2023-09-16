<script lang="ts" setup>
const { saveNote } = useStore()
const { rawText } = storeToRefs(useStore())
</script>

<template>
  <div class="editor d-flex flex-column">
    <textarea
      v-model="rawText"
      class="editor__area"
      @input="saveNote()"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor {
  overflow: auto;
  height: 100%;

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
