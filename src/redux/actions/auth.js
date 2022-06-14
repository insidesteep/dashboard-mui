import {
  AUTHORIZATION,
  SIGNIN,
  SHOW_LOADING,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNIN_FAILURE,
} from "../constants/auth";

export const singIn = (user) => {
  return {
    type: SIGNIN,
    payload: user,
  };
};

export const authorization = () => {
  return {
    type: AUTHORIZATION,
  };
};

export const singOut = () => {
  return {
    type: SIGNOUT,
  };
};

export const signInSuccess = (data) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: data,
  };
};

export const signInFailure = (message) => {
    return {
      type: SIGNIN_FAILURE,
      payload: message,
    };
  };

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};
