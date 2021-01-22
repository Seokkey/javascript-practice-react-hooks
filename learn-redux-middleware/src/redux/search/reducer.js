////// SearchReducer.js
import * as actions from './action'

const initialState = {
  data: {}
}

export const reducer = (state=initialState, action) => {
  switch(action.type){
    case actions.SEARCH:
      return {
        ...state,
        payload: action.payload
      }
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case actions.SEARCH_FAIL:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}