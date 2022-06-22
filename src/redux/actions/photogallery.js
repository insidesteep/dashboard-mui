import {
  PHOTOGALLERY_CREATE,
  PHOTOGALLERY_CREATE_FAILURE,
  PHOTOGALLERY_CREATE_SUCCESS,
  PHOTOGALLERY_DELETE,
  PHOTOGALLERY_DELETE_FAILURE,
  PHOTOGALLERY_DELETE_SUCCESS,
  PHOTOGALLERY_LIST,
  PHOTOGALLERY_LIST_FAILURE,
  PHOTOGALLERY_LIST_SUCCESS,
  SHOW_LOADING_PHOTOGALLERY_CREATE,
  SHOW_LOADING_PHOTOGALLERY_DELETE,
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

export const photogalleryDelete = (id) => {
  return {
    type: PHOTOGALLERY_DELETE,
    payload: id,
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

export const photogalleryDeleteSuccess = (galleries) => {
  return {
    type: PHOTOGALLERY_DELETE_SUCCESS,
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

export const photogalleryDeleteFailure = () => {
  return {
    type: PHOTOGALLERY_DELETE_FAILURE,
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

export const showLoadingPhotogalleryDelete = () => {
  return {
    type: SHOW_LOADING_PHOTOGALLERY_DELETE,
  };
};
