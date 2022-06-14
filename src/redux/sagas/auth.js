import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { SIGNIN, AUTHORIZATION, AUTH_TOKEN } from "../constants/auth";
import { signInSuccess, signInFailure } from "../actions/auth";

// import { setOrganization } from "../actions/Organization";

import JWTAuthService from "../../services/JWTAuthService";

export function* signIn() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    console.log(333);
    const { email, password } = payload;

    try {
      const user = yield call(JWTAuthService.login, { email, password });

      yield put(
        signInSuccess({
          token: user.jwt,
          userInfo: {
            firstName: user.firstname,
            lastName: user.lastname,
            userId: user.id,
          },
        })
      );

      localStorage.setItem(AUTH_TOKEN, user.jwt);
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));
      console.log();
      yield put(signInFailure(error.response.data.message || "Ошибка"));
    }
  });
}

export function* authorization() {
  yield takeEvery(AUTHORIZATION, function* () {
    try {
      const user = yield call(JWTAuthService.authorization);

      yield put(
        signInSuccess({
          token: user.jwt,
          userInfo: {
            firstName: user.firstname,
            lastName: user.lastname,
            userId: user.id,
          },
        })
      );

      localStorage.setItem(AUTH_TOKEN, user.jwt);
    } catch (error) {
      //   yield put(showAuthMessage("error", error.response.data.message));
      yield put(signInFailure(error.response.data.message || "Ошибка"));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(authorization)]);
}
