export function saveOptions ({currentItemState, changedItemState, initialItemState, options}) {
  let newItemState = changedItemState
  // Handle Options
  if (typeof options !== 'undefined') {
    if (Object.prototype.hasOwnProperty.call(options, 'sendFullAttributes')) {
      options.sendFullAttributes.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(newItemState.attributes, attr)) {
          newItemState.attributes[attr] = currentItemState.attributes[attr]
        }
      })
    }
    if (Object.prototype.hasOwnProperty.call(options, 'sendUnchangedAttributes')) {
      options.sendUnchangedAttributes.forEach(attr => {
        changedItemState.attributes[attr] = currentItemState.attributes[attr]
      })
    }
  }
  return newItemState
}
