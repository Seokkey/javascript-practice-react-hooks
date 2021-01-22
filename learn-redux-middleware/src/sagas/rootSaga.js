///// rootSaga.js
import { spawn } from "redux-saga/effects";
import watchSearch from './search/SearchSaga'

export default function* rootSaga() {
  yield spawn(watchSearch);
}
