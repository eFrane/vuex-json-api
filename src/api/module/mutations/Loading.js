export function startLoading (state, group) {
  if (group === null) {
    state.loading = true
    return
  }

  state.groups[group].loading = true
}

export function endLoading (state, group) {
  if (group === null) {
    state.loading = false
    return
  }

  state.groups[group].loading = false
}
