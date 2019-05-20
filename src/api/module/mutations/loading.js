export function startLoadingMutation (state, group) {
  if (group === null) {
    state.loading = true
    return
  }

  state.groups[group].loading = true
}

export function endLoadingMutation (state, group) {
  if (group === null) {
    state.loading = false
    return
  }

  state.groups[group].loading = false
}
