import {
  POST_CREATE,
  POST_CREATE_FAILURE,
  POST_CREATE_SUCCESS,
  POST_DELETE,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESS,
  POST_LIST,
  POST_LIST_FAILURE,
  POST_LIST_SUCCESS,
  POST_UPDATE,
  POST_UPDATE_FAILURE,
  POST_UPDATE_SUCCESS,
  SHOW_LOADING_POST_CREATE,
  SHOW_LOADING_POST_DELETE,
  SHOW_LOADING_POST_LIST,
  SHOW_LOADING_POST_UPDATE,
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

export const postDelete = (id) => {
  return {
    type: POST_DELETE,
    payload: id,
  };
};

export const postUpdate = (data, cb) => {
  return {
    type: POST_UPDATE,
    payload: { data, cb },
  };
};

export const postCreateSuccess = (posts) => {
  return {
    type: POST_CREATE_SUCCESS,
    payload: posts,
  };
};

export const postListSuccess = (posts) => {
  return {
    type: POST_LIST_SUCCESS,
    payload: posts,
  };
};

export const postDeleteSuccess = (posts) => {
  return {
    type: POST_DELETE_SUCCESS,
    payload: posts,
  };
};

export const postUpdateSuccess = (posts) => {
  return {
    type: POST_UPDATE_SUCCESS,
    payload: posts,
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

export const postDeleteFailure = () => {
  return {
    type: POST_DELETE_FAILURE,
  };
};

export const postUpdateeFailure = () => {
  return {
    type: POST_UPDATE_FAILURE,
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

export const showLoadingpostDelete = () => {
  return {
    type: SHOW_LOADING_POST_DELETE,
  };
};

export const showLoadingpostUpdate = () => {
  return {
    type: SHOW_LOADING_POST_UPDATE,
  };
};
