/**
 * Set pagination data from a meta.pagination object
 *
 * @param {Object} state
 * @param {Object} pagination
 */
export function setPaginationMutation (state, pagination) {
  state.currentPage = pagination.current_page
  state.totalPages = pagination.total_pages
}
