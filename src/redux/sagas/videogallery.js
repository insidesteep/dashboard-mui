import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  VIDEOGALLERY_CREATE,
  VIDEOGALLERY_DELETE,
  VIDEOGALLERY_LIST,
  VIDEOGALLERY_UPDATE,
} from "../constants/videogallery";
import {
  videogalleryCreateSuccess,
  videogalleryCreateFailure,
  videogalleryListSuccess,
  videogalleryListFailure,
  videogalleryDeleteSuccess,
  videogalleryDeleteFailure,
  videogalleryUpdateSuccess,
  videogalleryUpdateFailure,
} from "../actions/videogallery";

// import { setOrganization } from "../actions/Organization";

import VideogalleryService from "../../services/VideogalleryService";

export function* videogalleryCreate() {
  yield takeEvery(VIDEOGALLERY_CREATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const videos = yield call(VideogalleryService.create, data);

      yield put(videogalleryCreateSuccess(videos));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(videogalleryCreateFailure());
    }
  });
}

export function* videogalleryUpdate() {
  yield takeEvery(VIDEOGALLERY_UPDATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const videos = yield call(VideogalleryService.update, data);

      yield put(videogalleryUpdateSuccess(videos));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(videogalleryUpdateFailure());
    }
  });
}

export function* videogalleryDelete() {
  yield takeEvery(VIDEOGALLERY_DELETE, function* ({ payload }) {
    try {
      const videos = yield call(VideogalleryService.delete, payload);

      yield put(videogalleryDeleteSuccess(videos));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(videogalleryDeleteFailure());
    }
  });
}

export function* videogalleryList() {
  yield takeEvery(VIDEOGALLERY_LIST, function* ({ payload }) {
    try {
      const videos = yield call(VideogalleryService.list, payload);

      yield put(videogalleryListSuccess(videos));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(videogalleryListFailure());
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(videogalleryCreate),
    fork(videogalleryList),
    fork(videogalleryDelete),
    fork(videogalleryUpdate),
  ]);
}
