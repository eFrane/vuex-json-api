// import Vuex from 'vuex'
import { initialState } from '../../src/module/State'

it('returns the default state for a non-collection module', () => {
  let state = initialState(false)
  expect(state).toMatchSnapshot()
})

it('returns the default state for a collection module', () => {
  let state = initialState(true)
  expect(state).toMatchSnapshot()
})
