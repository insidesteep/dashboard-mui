import {
  CATEGORY_CREATE,
  CATEGORY_CREATE_FAILURE,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_SUCCESS,
  SHOW_LOADING_CATEGORY_CREATE,
  SHOW_LOADING_CATEGORY_LIST,
} from "../constants/category";

export const categoryCreate = (data, cb) => {
  return {
    type: CATEGORY_CREATE,
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

export const showLoadingCategoryList = () => {
  return {
    type: SHOW_LOADING_CATEGORY_LIST,
  };
};
