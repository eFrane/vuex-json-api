/**
 * Make sure we always have a query object
 *
 * @param {object} query
 * @param {object} defaultQuery
 */
export function prepareQuery (query, defaultQuery) {
  if (typeof query === 'undefined') {
    query = {}
  }

  return Object.assign(query, defaultQuery, query)
}
