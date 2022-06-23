import {
  CATEGORY_CREATE,
  CATEGORY_CREATE_FAILURE,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_UPDATE_SUCCESS,
  SHOW_LOADING_CATEGORY_CREATE,
  SHOW_LOADING_CATEGORY_LIST,
  SHOW_LOADING_CATEGORY_UPDATE,
} from "../constants/category";

export const categoryCreate = (data, cb) => {
  return {
    type: CATEGORY_CREATE,
    payload: { data, cb },
  };
};

export const categoryUpdate = (data, cb) => {
  return {
    type: CATEGORY_UPDATE,
    payload: { data, cb },
  };
};

export const categoryList = () => {
  return {
    type: CATEGORY_LIST,
  };
};

export const categoryCreateSuccess = (categories) => {
  return {
    type: CATEGORY_CREATE_SUCCESS,
    payload: categories,
  };
};

export const categoryUpdateSuccess = (categories) => {
  return {
    type: CATEGORY_UPDATE_SUCCESS,
    payload: categories,
  };
};

export const categoryListSuccess = (categories) => {
  return {
    type: CATEGORY_LIST_SUCCESS,
    payload: categories,
  };
};

export const categoryCreateFailure = () => {
  return {
    type: CATEGORY_CREATE_FAILURE,
  };
};

export const categoryUpdateFailure = () => {
  return {
    type: CATEGORY_UPDATE_FAILURE,
  };
};

export const categoryListFailure = () => {
  return {
    type: CATEGORY_LIST_FAILURE,
  };
};

export const showLoadingCategoryCreate = () => {
  return {
    type: SHOW_LOADING_CATEGORY_CREATE,
  };
};

export const showLoadingCategoryUpdate = () => {
  return {
    type: SHOW_LOADING_CATEGORY_UPDATE,
  };
};

export const showLoadingCategoryList = () => {
  return {
    type: SHOW_LOADING_CATEGORY_LIST,
  };
};
