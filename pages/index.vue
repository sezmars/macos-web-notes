<script lang="ts" setup>
const {
  getQueryId,
  getNotesLength,
  navigateCurrentNote,
  initStoreNotes,
  setCurrentNote,
} = useStore();

useHead({
  title: "MacOS Note App",
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
    {
      name: "description",
      content: "Home page of MacOS Note App",
    },
  ],
});

const isDeleteModalOpen = ref(false);

const toggleDeleteModal = (value: boolean) => (isDeleteModalOpen.value = value);

const { isPreviewActive } = storeToRefs(useStore());

const isMenuOpen = ref(true);

onBeforeMount(async () => {
  const { getNotes } = useMdNotes();
  const data = await getNotes();

  if (data.length) {
    await initStoreNotes();
    setCurrentNote(getQueryId());
  } else {
    await navigateCurrentNote("");
  }
});
</script>

<template>
  <div class="home d-flex">
    <SidebarComponent
      v-show="isMenuOpen"
      @toggle-delete-modal="toggleDeleteModal(true)"
    />
    <div class="home__container">
      <div
        class="home__container-main d-flex flex-column"
        :class="{ main: !isPreviewActive }"
      >
        <HeaderComponent
          v-if="getQueryId() && getNotesLength()"
          :date-state="!isPreviewActive"
        />
        <EditorComponent v-show="!isPreviewActive" />
        <PreviewComponent v-show="isPreviewActive" />
      </div>
    </div>

    <DeleteModalComponent
      v-if="isDeleteModalOpen"
      @toggle-delete-modal="toggleDeleteModal"
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