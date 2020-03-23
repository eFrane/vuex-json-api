import { deepMerge, hasOwn } from '../../../shared/utils'

export function saveOptions ({ currentItemState, changedItemState, options }) {
  const returnedItemState = JSON.parse(JSON.stringify(changedItemState))
  if (typeof options !== 'undefined' && hasOwn(returnedItemState, 'attributes')) {
    Object.keys(options).forEach(option => {
      switch (option) {
        case 'attributes':
          returnedItemState.attributes = attributeOptions({ currentItemState, changedAttributes: returnedItemState.attributes, options: options[option] })
      }
    })
  }

  return returnedItemState
}

const attributeOptions = ({ currentItemState, changedAttributes, options }) => {
  Object.keys(options).forEach(option => {
    switch (option) {
      case 'full':
        if (typeof options.full === 'string') {
          if (hasOwn(changedAttributes, options.full)) {
            changedAttributes[options.full] = deepMerge(currentItemState.attributes[options.full], changedAttributes[options.full])
          }
        } else {
          options.full.forEach(attr => {
            if (hasOwn(changedAttributes, attr)) {
              changedAttributes[options.full] = deepMerge(currentItemState.attributes[attr], changedAttributes[attr])
            }
          })
        }
        break
      case 'unchanged':
        if (typeof options.unchanged === 'string') {
          if (hasOwn(changedAttributes, options.unchanged)) {
            changedAttributes[options.unchanged] = changedAttributes[options.unchanged] ? changedAttributes[options.unchanged] : currentItemState.attributes[options.unchanged]
          }
        } else {
          options.unchanged.forEach(attr => {
            if (hasOwn(changedAttributes, attr)) {
              changedAttributes[attr] = changedAttributes[attr] ? changedAttributes[attr] : currentItemState.attributes[attr]
            }
          })
        }
        break
    }
  })

  return changedAttributes
}
