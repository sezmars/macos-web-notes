<script lang="ts" setup>
const {
  navigateCurrentNote,
  initStoreNotes,
  setCurrentNote
} = useStore()

useHead({
  title: 'MacOS Note App',
  meta: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    {
      name: 'description',
      content: 'Home page of MacOS Note App'
    }
  ]
})
const { isPreviewActive } = storeToRefs(useStore())
const { id } = useQueryId()

const isMenuOpen = ref(true)
const isLoadData = ref(false)
const isDeleteModalOpen = ref(false)

const toggleDeleteModal = (value: boolean) => (isDeleteModalOpen.value = value)

const resetStateEditiorView = (value: boolean) => (isPreviewActive.value = value)

onBeforeMount(async () => {
  await initStoreNotes()

  if (id.value) {
    setCurrentNote(id.value)
  } else {
    await navigateCurrentNote('')
  }

  isLoadData.value = true
})
</script>

<template>
  <div class="home d-flex">
    <Sidebar
      v-show="isMenuOpen"
      :is-load-data="isLoadData"
      @add-new-note="resetStateEditiorView(false)"
      @toggle-delete-modal="toggleDeleteModal(true)"
    />
    <div class="home__container">
      <div
        class="home__container-main d-flex flex-column"
        :class="{ main: !isPreviewActive }"
      >
        <Header
          v-if="isLoadData"
          :date-state="!isPreviewActive"
        />
        <Editor v-show="!isPreviewActive" />
        <Preview v-show="isPreviewActive" />
      </div>
    </div>

    <DeleteModal
      v-if="isDeleteModalOpen"
      @toggle-delete-modal="toggleDeleteModal(false)"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100vh;

  .sidebar {
    animation: slide-right 0.3s ease-out both;
  }

  &__container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--bg-color);
      color: var(--text-color);
      padding-bottom: 3rem;

      hr {
        @media (max-width: 768px) {
          display: none !important;
        }
      }

      .preview-pane {
        @media (max-width: 768px) {
          display: block;
        }
      }

      .preview-pane-inactive {
        @media (max-width: 768px) {
          display: none;
        }
      }
    }
  }
}

@keyframes slide-right {
  0% {
    transform: translateX(-100px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
