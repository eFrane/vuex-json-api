export function listTypeAndId (state) {
  return Object.values(state.items).map(item => {
    return {
      id: item.id,
      type: item.type
    }
  })
}
