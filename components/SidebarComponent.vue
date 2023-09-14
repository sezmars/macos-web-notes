<script lang="ts" setup>
const { docs } = storeToRefs(useStore());
const { setCurrentDoc } = useStore();
</script>

<template>
  <div class="sidebar d-flex align-items-start flex-column">
    <div class="up d-flex align-items-start flex-column">
      <div class="d-flex gap-4">
        <IconsAdd class="cursor-pointer" />
        <IconsDelete class="cursor-pointer" />
      </div>

      <ul v-if="docs && docs.length > 0" class="docs__list d-flex flex-column">
        <li
          v-for="doc in docs"
          class="docs__list-doc d-flex align-items-center gap-6"
          @click="setCurrentDoc(doc.id)"
        >
          <div class="docs__list-doc-info d-flex flex-column gap-3">
            <span
              class="docs__list-doc-info-name weight-500 text-overflow-ellipsis"
              >{{ doc.title }}</span
            >
            <div class="d-flex">
              <span
                class="docs__list-doc-info-date weight-400 text-overflow-ellipsis"
                >{{ formatDate(doc.created) }} &nbsp;
              </span>
              <span
                class="docs__list-doc-info-date weight-300 text-overflow-ellipsis"
              >
                {{ truncateText(doc.content, 20) }}</span
              >
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="down">
      <Toggle />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 30rem;
  height: 100vh;
  padding: 2.7rem 2.4rem;
  justify-content: space-between;
  border-right: 1px solid $col-lightGrayShade;

  .up {
    gap: 2.9rem;

    .header {
      font-size: 1.4rem;
      color: $col-lightCyanBlue;
      letter-spacing: 0.3rem;
    }

    .docs__list {
      gap: 2.6rem;

      &-doc {
        cursor: pointer;
        padding: 20px 14px;
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
  }
}
</style>
