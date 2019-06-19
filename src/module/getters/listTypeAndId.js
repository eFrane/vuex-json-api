/**
 * Return a listing of a collection module in the format
 * required for a relationships-property of that module's type
 *
 * @param {object} state
 * @returns {object}
 */
export function listTypeAndId (state) {
  return Object.values(state.items).map(item => {
    return {
      id: item.id,
      type: item.type
    }
  })
}
