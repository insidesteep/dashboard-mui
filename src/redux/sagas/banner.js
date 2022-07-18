import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  BANNER_CREATE,
  BANNER_DELETE,
  BANNER_LIST,
  BANNER_UPDATE,
} from "../constants/banner";
import {
  bannerCreateSuccess,
  bannerCreateFailure,
  bannerListSuccess,
  bannerListFailure,
  bannerDeleteSuccess,
  bannerDeleteFailure,
  bannerUpdateSuccess,
  bannerUpdateeFailure,
} from "../actions/banner";

// import { setOrganization } from "../actions/Organization";

import BannerService from "../../services/BannerService";

export function* bannerCreate() {
  yield takeEvery(BANNER_CREATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const posts = yield call(BannerService.create, data);

      yield put(bannerCreateSuccess(posts));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      console.log(error);
      yield put(bannerCreateFailure(error.response.data.message || ""));
    }
  });
}

export function* bannerUpdate() {
  yield takeEvery(BANNER_UPDATE, function* ({ payload }) {
    const { data, cb } = payload;

    try {
      const posts = yield call(BannerService.update, data);

      yield put(bannerUpdateSuccess(posts));
      yield cb();
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(bannerUpdateeFailure(error.response.data.message || ""));
    }
  });
}

export function* bannerDelete() {
  yield takeEvery(BANNER_DELETE, function* ({ payload }) {
    try {
      const posts = yield call(BannerService.delete, payload);

      yield put(bannerDeleteSuccess(posts));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(bannerDeleteFailure(error.response.data.message || ""));
    }
  });
}

export function* bannerList() {
  yield takeEvery(BANNER_LIST, function* ({ payload }) {
    try {
      const posts = yield call(BannerService.list, payload);

      yield put(bannerListSuccess(posts));
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));\
      yield put(bannerListFailure());
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(bannerCreate),
    fork(bannerList),
    fork(bannerDelete),
    fork(bannerUpdate),
  ]);
}
