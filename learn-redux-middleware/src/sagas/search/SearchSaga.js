///// SearchSaga.js
import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "axios";

function* fetchSearchSaga(action) {
  try {
    const json = {
      name: action.payload
    };
    const { data } = yield call([axios, 'post'], '/api/nba/player', json);
    yield put(actions.searchSuccess(data));
  } catch (error) {
    yield put(actions.searchFail(error.response));
  }
}

export default function* watchSearch() {
  yield takeEvery(actions.SEARCH, fetchSearchSaga);
}