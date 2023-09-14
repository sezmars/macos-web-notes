<script lang="ts" setup>
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

const { docs } = storeToRefs(useStore());

const isMenuOpen = ref(true);

onBeforeMount(async () => {
  const { getDocs } = useMdDocs();
  const data = await getDocs();

  if (data) {
    data.sort(
      (a: Doc, b: Doc) =>
        new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
    docs.value = data;
  }
});
</script>

<template>
  <div>
    <SidebarComponent v-show="isMenuOpen" />
  </div>
</template>
