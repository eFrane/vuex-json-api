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

  if (typeof defaultQuery === 'undefined') {
    defaultQuery = {}
  }

  return Object.assign(query, defaultQuery, query)
}
