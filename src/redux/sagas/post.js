import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { POST_CREATE, POST_LIST } from "../constants/post";
import {
  postCreateSuccess,
  postCreateFailure,
  postListSuccess,
  postListFailure,
} from "../actions/post";

// import { setOrganization } from "../actions/Organization";

import PostService from "../../services/PostService";

export function* postCreate() {
  yield takeEvery(POST_CREATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const posts = yield call(PostService.create, data);

      yield put(postCreateSuccess(posts));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(postCreateFailure());
    }
  });
}

export function* postList() {
  yield takeEvery(POST_LIST, function* ({ payload }) {
    try {
      const posts = yield call(PostService.list, payload);

      yield put(postListSuccess(posts));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(postListFailure());
    }
  });
}

export default function* rootSaga() {
  yield all([fork(postCreate), fork(postList)]);
}
