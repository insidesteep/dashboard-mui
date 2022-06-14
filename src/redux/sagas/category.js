import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { CATEGORY_CREATE, CATEGORY_LIST } from "../constants/category";
import {
  categoryCreateSuccess,
  categoryCreateFailure,
  categoryListSuccess,
  categoryListFailure,
} from "../actions/category";

// import { setOrganization } from "../actions/Organization";

import CategoryService from "../../services/CategoryService";

export function* categoryCreate() {
  yield takeEvery(CATEGORY_CREATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const categories = yield call(CategoryService.create, data);

      yield put(categoryCreateSuccess(categories));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(categoryCreateFailure());
    }
  });
}

export function* categoryList() {
  yield takeEvery(CATEGORY_LIST, function* ({ payload }) {
    try {
      const categories = yield call(CategoryService.list, payload);

      yield put(categoryListSuccess(categories));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(categoryListFailure());
    }
  });
}

export default function* rootSaga() {
  yield all([fork(categoryCreate), fork(categoryList)]);
}
