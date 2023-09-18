<script lang="ts" setup>

const { currentNoteUpdateDate, isPreviewActive } = storeToRefs(useStore())
const {
  getQueryId,
  getNotesLength
} = useStore()

const props = defineProps({
  dateState: Boolean
})

</script>

<template>
  <header class="w-100 d-flex align-items-center">
    <div class="left d-flex align-items-center gap-5">
      <div class="header position-sticky d-flex align-items-center weight-500">
        <IconsMarkdown
          v-if="isPreviewActive"
          class="cursor-pointer"
          :is-preview-active="isPreviewActive"
          @click="isPreviewActive = !isPreviewActive"
        />

        <IconsEdit
          v-else
          class="cursor-pointer"
          :is-preview-active="isPreviewActive"
          @click="isPreviewActive = !isPreviewActive"
        />
      </div>
    </div>

    <div class="right d-flex align-items-center gap-9">
      <SearchComponent />
    </div>
  </header>
  <div
    v-if="props.dateState && currentNoteUpdateDate && getQueryId() && getNotesLength()"
    class="d-flex justify-content-center date"
  >
    {{ formatDate(currentNoteUpdateDate, "fullDate") }}
  </div>
</template>

<style lang="scss" scoped>
header {
  height: 5rem;
  padding: 2rem;
  justify-content: space-between;

  @media (max-width: 480px) {
    padding: 1rem;
  }

  .left {
    .menu {
      height: 7.2rem;
      width: 12rem;
      background: $col-darkGrayishBlue;
      color: $col-white;
      transition: background 0.2s ease-in-out;

      &:hover {
        background: $col-redOrange;
      }

      @media (max-width: 550px) {
        width: 7.2rem;
      }
    }

    .logo {
      max-width: 12rem;
      margin-left: 2.4rem;

      @media (max-width: 768px) {
        display: none;
      }
    }

    hr {
      height: 4rem;
      width: 1px;
      background: $col-lightCyanBlue;
      border: none;
      margin: 0 2.4rem;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .right {
    padding-right: 1.5rem;
  }
}
.date {
  color: $col-lightCyanBlue;
  @include font(1.3rem, 1.5rem);
}
</style>
