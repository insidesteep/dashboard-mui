import {
  BANNER_CREATE,
  BANNER_CREATE_FAILURE,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE,
  BANNER_DELETE_FAILURE,
  BANNER_DELETE_SUCCESS,
  BANNER_LIST,
  BANNER_LIST_FAILURE,
  BANNER_LIST_SUCCESS,
  BANNER_UPDATE,
  BANNER_UPDATE_FAILURE,
  BANNER_UPDATE_SUCCESS,
  SHOW_LOADING_BANNER_CREATE,
  SHOW_LOADING_BANNER_DELETE,
  SHOW_LOADING_BANNER_LIST,
  SHOW_LOADING_BANNER_UPDATE,
} from "../constants/banner";

export const bannerCreate = (data, cb) => {
  return {
    type: BANNER_CREATE,
    payload: { data, cb },
  };
};

export const bannerList = () => {
  return {
    type: BANNER_LIST,
  };
};

export const bannerDelete = (id) => {
  return {
    type: BANNER_DELETE,
    payload: id,
  };
};

export const bannerUpdate = (data, cb) => {
  return {
    type: BANNER_UPDATE,
    payload: { data, cb },
  };
};

export const bannerCreateSuccess = (banners) => {
  return {
    type: BANNER_CREATE_SUCCESS,
    payload: banners,
  };
};

export const bannerListSuccess = (banners) => {
  return {
    type: BANNER_LIST_SUCCESS,
    payload: banners,
  };
};

export const bannerDeleteSuccess = (banners) => {
  return {
    type: BANNER_DELETE_SUCCESS,
    payload: banners,
  };
};

export const bannerUpdateSuccess = (banners) => {
  return {
    type: BANNER_UPDATE_SUCCESS,
    payload: banners,
  };
};

export const bannerCreateFailure = (error) => {
  return {
    type: BANNER_CREATE_FAILURE,
    payload: error,
  };
};

export const bannerListFailure = (error) => {
  return {
    type: BANNER_LIST_FAILURE,
    payload: error,
  };
};

export const bannerDeleteFailure = (error) => {
  return {
    type: BANNER_DELETE_FAILURE,
    payload: error,
  };
};

export const bannerUpdateeFailure = (error) => {
  return {
    type: BANNER_UPDATE_FAILURE,
    payload: error,
  };
};

export const showLoadingBannerCreate = () => {
  return {
    type: SHOW_LOADING_BANNER_CREATE,
  };
};

export const showLoadingBannerList = () => {
  return {
    type: SHOW_LOADING_BANNER_LIST,
  };
};

export const showLoadingBannerDelete = () => {
  return {
    type: SHOW_LOADING_BANNER_DELETE,
  };
};

export const showLoadingBannerUpdate = () => {
  return {
    type: SHOW_LOADING_BANNER_UPDATE,
  };
};
