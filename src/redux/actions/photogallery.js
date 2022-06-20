import {
  PHOTOGALLERY_CREATE,
  PHOTOGALLERY_CREATE_FAILURE,
  PHOTOGALLERY_CREATE_SUCCESS,
  PHOTOGALLERY_LIST,
  PHOTOGALLERY_LIST_FAILURE,
  PHOTOGALLERY_LIST_SUCCESS,
  SHOW_LOADING_PHOTOGALLERY_CREATE,
  SHOW_LOADING_PHOTOGALLERY_LIST,
} from "../constants/photogallery";

export const photogalleryCreate = (data, cb) => {
  return {
    type: PHOTOGALLERY_CREATE,
    payload: { data, cb },
  };
};

export const photogalleryList = () => {
  return {
    type: PHOTOGALLERY_LIST,
  };
};

export const photogalleryCreateSuccess = (galleries) => {
  return {
    type: PHOTOGALLERY_CREATE_SUCCESS,
    payload: galleries,
  };
};

export const photogalleryListSuccess = (galleries) => {
  return {
    type: PHOTOGALLERY_LIST_SUCCESS,
    payload: galleries,
  };
};

export const photogalleryCreateFailure = () => {
  return {
    type: PHOTOGALLERY_CREATE_FAILURE,
  };
};

export const photogalleryListFailure = () => {
  return {
    type: PHOTOGALLERY_LIST_FAILURE,
  };
};

export const showLoadingPhotogalleryCreate = () => {
  return {
    type: SHOW_LOADING_PHOTOGALLERY_CREATE,
  };
};

export const showLoadingPhotogalleryList = () => {
  return {
    type: SHOW_LOADING_PHOTOGALLERY_LIST,
  };
};
