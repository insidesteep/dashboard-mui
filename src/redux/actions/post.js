import {
  POST_CREATE,
  POST_CREATE_FAILURE,
  POST_CREATE_SUCCESS,
  POST_LIST,
  POST_LIST_FAILURE,
  POST_LIST_SUCCESS,
  SHOW_LOADING_POST_CREATE,
  SHOW_LOADING_POST_LIST,
} from "../constants/post";

export const postCreate = (data, cb) => {
  return {
    type: POST_CREATE,
    payload: { data, cb },
  };
};

export const postList = () => {
  return {
    type: POST_LIST,
  };
};

export const postCreateSuccess = (categories) => {
  return {
    type: POST_CREATE_SUCCESS,
    payload: categories,
  };
};

export const postListSuccess = (categories) => {
  return {
    type: POST_LIST_SUCCESS,
    payload: categories,
  };
};

export const postCreateFailure = () => {
  return {
    type: POST_CREATE_FAILURE,
  };
};

export const postListFailure = () => {
  return {
    type: POST_LIST_FAILURE,
  };
};

export const showLoadingpostCreate = () => {
  return {
    type: SHOW_LOADING_POST_CREATE,
  };
};

export const showLoadingpostList = () => {
  return {
    type: SHOW_LOADING_POST_LIST,
  };
};
