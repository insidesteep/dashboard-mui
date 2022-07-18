import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  PHOTOGALLERY_CREATE,
  PHOTOGALLERY_DELETE,
  PHOTOGALLERY_LIST,
  PHOTOGALLERY_UPDATE,
} from "../constants/photogallery";
import {
  photogalleryCreateSuccess,
  photogalleryCreateFailure,
  photogalleryListSuccess,
  photogalleryListFailure,
  photogalleryDeleteSuccess,
  photogalleryDeleteFailure,
  photogalleryUpdateSuccess,
  photogalleryUpdateFailure,
} from "../actions/photogallery";

// import { setOrganization } from "../actions/Organization";

import PhotogalleryService from "../../services/PhotogalleryService";

export function* photogalleryCreate() {
  yield takeEvery(PHOTOGALLERY_CREATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const galleries = yield call(PhotogalleryService.create, data);

      yield put(photogalleryCreateSuccess(galleries));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(photogalleryCreateFailure(error.response.data.message || ""));
    }
  });
}

export function* photogalleryDelete() {
  yield takeEvery(PHOTOGALLERY_DELETE, function* ({ payload }) {
    try {
      const galleries = yield call(PhotogalleryService.delete, payload);

      yield put(photogalleryDeleteSuccess(galleries));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(photogalleryDeleteFailure(error.response.data.message || ""));
    }
  });
}

export function* photogalleryUpdate() {
  yield takeEvery(PHOTOGALLERY_UPDATE, function* ({ payload }) {
    try {
      const { data, cb } = payload;

      const categories = yield call(PhotogalleryService.update, data);

      yield put(photogalleryUpdateSuccess(categories));
      cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(photogalleryUpdateFailure(error.response.data.message || ""));
    }
  });
}

export function* photogalleryList() {
  yield takeEvery(PHOTOGALLERY_LIST, function* ({ payload }) {
    try {
      const categories = yield call(PhotogalleryService.list, payload);

      yield put(photogalleryListSuccess(categories));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(photogalleryListFailure());
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(photogalleryCreate),
    fork(photogalleryList),
    fork(photogalleryDelete),
    fork(photogalleryUpdate),
  ]);
}
