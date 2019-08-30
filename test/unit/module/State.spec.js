// import Vuex from 'vuex'
import { initialState } from '../../../src/module/State'
// import { collection } from '../../src/module/state/collection'
// import { item } from '../../src/module/state/item'

it('returns the default state for a non-collection module', () => {
  let state = initialState(false)
  expect(state).toMatchSnapshot()
})

it('returns the default state for a collection module', () => {
  let state = initialState(true)
  expect(state).toMatchSnapshot()
})

// it('is a deep copy returned from a function', () => {
//   let collectionState = initialState(false)
//   // expect(collectionState).not().toEqual(collection)
// })
