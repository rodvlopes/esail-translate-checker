import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const Reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_SELECTED_FILE':
      return {
        ...state,
        selectedFile: payload,
      }
    case 'SET_SELECTED_LANG':
      return {
        ...state,
        selectedLang: payload,
      }
    case 'ADD_DATA':
      return {
        ...state,
        selectedFile: payload.filename,
        selectedLang: Object.keys(payload)[2], //0 is 'filename', 1 is 'datetime' not a lang
        data: state.data
          .filter((f) => f.filename !== payload.filename)
          .concat([payload]),
      }
    default:
      return state
  }
}

/**
 * Fires fn(newState) whenever the reducer produces a new state
 */
const ChangeStateEnhancer = (reducer, fn) => {
  return (state, action) => {
    const newState = reducer(state, action)
    if (state !== newState) {
      fn(newState)
    }
    return newState
  }
}

const reducer = ChangeStateEnhancer(Reducer, (newState) => {
  localStorage['state'] = JSON.stringify(newState)
})

// { //sample state to test
//   selectedFile: 'filename',
//   selectedLang: 'en',
//   data: [
//     {
//       filename: 'filename',
//       it: 'it data',
//       pt: 'pt data'
//     }
//   ]
// }

const initialState = () => {
  try {
    return JSON.parse(localStorage['state'])
  } catch {
    return {
      selectedFile: null,
      selectedLang: null,
      data: [],
    }
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState())
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

Store.propTypes = {
  children: PropTypes.element.isRequired,
}

export const Context = createContext(initialState)
export default Store
