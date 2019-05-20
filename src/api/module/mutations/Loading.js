export function startLoading (state, group) {
  if (null === group) {
    state.loading = true
    return
  }

  state.groups[group].loading = true
}

export function endLoading (state, group) {
  if (null === group) {
    state.loading = false
    return
  }

  state.groups[group].loading = false
}
