<script lang="ts" setup>
const { searchNotes } = useStore()
const route = useRoute()

const input = ref(null)
const text: string = route.query.q as string

const search = async () => {
  const value = (input.value! as HTMLInputElement)?.value

  await navigateTo({
    path: '/',
    query: { q: value, note: route.query.note }
  })

  await searchNotes(value)
}

onMounted(async () => {
  if (text) {
    await search()
  }
})

</script>

<template>
  <div class="input-icon-wrap">
    <span class="input-icon"><IconsSearch /></span>
    <input
      ref="input"
      v-model="text"
      type="text"
      placeholder="Search"
      class="input-with-icon"
      @input="search"
    >
  </div>
</template>

<style lang="scss">
.input-icon-wrap {
  border: 1px solid $col-lightBlueShade;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
}

.input-with-icon {
  border: none;
  flex: 1;
}

.input-with-icon {
  padding: 4px;
  border-radius: 8px;
}

.input-icon {
  padding: 4px 8px 4px 8px;
  border-radius: 8px;
}
</style>
