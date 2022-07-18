import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  POST_CREATE,
  POST_DELETE,
  POST_LIST,
  POST_UPDATE,
} from "../constants/post";
import {
  postCreateSuccess,
  postCreateFailure,
  postListSuccess,
  postListFailure,
  postDeleteSuccess,
  postDeleteFailure,
  postUpdateSuccess,
  postUpdateeFailure,
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
      console.log(error);
      yield put(postCreateFailure(error.response.data.message || ""));
    }
  });
}

export function* postUpdate() {
  yield takeEvery(POST_UPDATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const posts = yield call(PostService.update, data);

      yield put(postUpdateSuccess(posts));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(postUpdateeFailure(error.response.data.message || ""));
    }
  });
}

export function* postDelete() {
  yield takeEvery(POST_DELETE, function* ({ payload }) {
    try {
      const posts = yield call(PostService.delete, payload);

      yield put(postDeleteSuccess(posts));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(postDeleteFailure(error.response.data.message || ""));
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
  yield all([
    fork(postCreate),
    fork(postList),
    fork(postDelete),
    fork(postUpdate),
  ]);
}
