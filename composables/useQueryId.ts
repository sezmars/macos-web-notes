export const useQueryId = () => {
  const route = useRoute()

  const id = ref(route.query.note)

  watch(
    () => route.query,
    (query) => {
      id.value = query.note
    }
  )

  return { id }
}
