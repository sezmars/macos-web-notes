<script lang="ts" setup>

import { Remarkable } from 'remarkable'

const { rawText, parsedText, isPreviewActive } = storeToRefs(useStore())

const md = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

const parseMarkdown = (text: string) => {
  return md.render(text)
}

watchEffect(() => {
  parsedText.value = parseMarkdown(rawText.value)
})
</script>

<template>
  <div class="preview d-flex flex-column">
    <div
      class="preview__area"
      :class="{ active: isPreviewActive }"
      v-html="parsedText"
    />
  </div>
</template>

<style lang="scss" scoped>
.preview {
  overflow: auto;

  &__area {
    flex: 1;
    background-color: var(--bg-color);
    color: var(--header-text-color);
    overflow: auto;
    padding: 0.9rem 1.6rem 10rem;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .active {
    width: 100%;
    max-width: 70rem;
    margin: 0 auto;
  }
}
</style>
