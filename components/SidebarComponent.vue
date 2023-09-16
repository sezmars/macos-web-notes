<script lang="ts" setup>
import { Emits } from '~/types'
import { Common } from '~/utils/enums'

const { getNotesLength, getQueryId } = useStore()
const { isMobile } = useDevice()
const { setCurrentNote, navigateCurrentNote, createNote } = useStore()
const { notes, rawText } = storeToRefs(useStore())

const emits = defineEmits<Emits>()

const toggleDeleteModal = () => {
  if (rawText.value) { return emits(Common.toggleDeleteModal, true) }
}

const createNewNote = async () => {
  await createNote()
  return emits(Common.addNewNote, false)
}

const isMenuOpen = ref(true)
const toggleMenu = (value: boolean) => (isMenuOpen.value = value)
isMenuOpen.value = !isMobile
</script>

<template>
  <div class="d-flex">
    <div
      class="sidebar d-flex align-items-start flex-column transition"
      :class="{ hidden: !isMenuOpen, open: isMenuOpen }"
    >
      <div class="up d-flex align-items-start flex-column">
        <div class="d-flex gap-4">
          <IconsAdd class="cursor-pointer" @click="createNewNote()" />
          <IconsDelete
            v-if="getQueryId() && getNotesLength()"
            class="cursor-pointer"
            @click="toggleDeleteModal"
          />
        </div>

        <ul v-if="getNotesLength()" class="notes__list d-flex flex-column">
          <li
            v-for="note in notes"
            :key="note.id"
            :class="getQueryId() === note.id ? 'active' : ''"
            class="notes__list-note d-flex align-items-center gap-6"
            @click="
              setCurrentNote(note.id);
              navigateCurrentNote(note.id);
            "
          >
            <div class="notes__list-note-info d-flex flex-column gap-3">
              <span
                class="notes__list-note-info-name weight-500 text-overflow-ellipsis"
              >{{ note.title }}</span>
              <div class="d-flex">
                <span
                  class="notes__list-note-info-date weight-400 text-overflow-ellipsis"
                >{{ formatDate(note.updated) }} &nbsp;
                </span>
                <span
                  class="notes__list-note-info-date weight-300 text-overflow-ellipsis"
                >
                  {{ truncateText(note.content, 20) }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!getNotesLength()" class="d-flex emty">
        <span>No notes</span>
      </div>
    </div>
    <button class="menu" @click="toggleMenu(!isMenuOpen)">
      <IconsMenu :variant="isMenuOpen ? 'close' : 'open'" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.hidden,
.open {
  -webkit-transition: width 0.5s linear;
  -moz-transition: width 0.5s linear;
  -ms-transition: width 0.5s linear;
  -o-transition: width 0.5s linear;
  transition: width 0.5s linear;
}

.hidden {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;
  z-index: -9999;
  width: 0;
  padding: 0 !important;
}

.open {
  width: 350px;
  opacity: 1;
  transition: all 0.5s ease-in-out;
}

.menu {
  display: flex;
  padding: 1.7rem 1rem 1rem 1rem;
}

.sidebar {
  height: 100vh;
  padding: 2.7rem 2.4rem;
  justify-content: space-between;
  border-right: 1px solid $col-lightGrayShade;

  @media (max-width: 480px) {
    width: 28rem;
  }

  .emty {
    margin: 0 auto;
    color: $col-lightCyanBlue;
  }

  .up {
    gap: 2.9rem;

    .header {
      font-size: 1.4rem;
      color: $col-lightCyanBlue;
      letter-spacing: 0.3rem;
    }

    .notes__list {
      gap: 2.6rem;

      &-note {
        cursor: pointer;
        padding: 20px 14px;
        width: 300px;

        @media (max-width: 480px) {
          width: 230px;
        }

        &:hover {
          background: $col-yellorOrangeShade;
          border-radius: 7px;
        }

        &-info {
          &-date {
            @include font(1.6rem, 1.5rem);
            white-space: nowrap;
            color: $col-lightCyanBlue;
          }

          &-name {
            @include font(1.5rem, 1.7rem);
            white-space: nowrap;
            text-transform: capitalize;
          }
        }
      }
    }
    .active {
      background: $col-lightGrayShade;
      border-radius: 7px;
    }
  }
}
</style>
