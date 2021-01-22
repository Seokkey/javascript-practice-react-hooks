///// index.js
import { combineReducers } from 'redux';
import {reducer as search} from './search/reducer';


const rootReducer = combineReducers({
  search,
})

export default rootReducer