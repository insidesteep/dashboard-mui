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
  PHOTOGALLERY_UPDATE,
  PHOTOGALLERY_UPDATE_FAILURE,
  PHOTOGALLERY_UPDATE_SUCCESS,
  SHOW_LOADING_PHOTOGALLERY_CREATE,
  SHOW_LOADING_PHOTOGALLERY_DELETE,
  SHOW_LOADING_PHOTOGALLERY_LIST,
  SHOW_LOADING_PHOTOGALLERY_UPDATE,
} from "../constants/photogallery";

export const photogalleryCreate = (data, cb) => {
  return {
    type: PHOTOGALLERY_CREATE,
    payload: { data, cb },
  };
};

export const photogalleryList = (page) => {
  return {
    type: PHOTOGALLERY_LIST,
    payload: page,
  };
};

export const photogalleryUpdate = (data, cb) => {
  return {
    type: PHOTOGALLERY_UPDATE,
    payload: { data, cb },
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

export const photogalleryUpdateSuccess = (galleries) => {
  return {
    type: PHOTOGALLERY_UPDATE_SUCCESS,
    payload: galleries,
  };
};

export const photogalleryDeleteSuccess = (galleries) => {
  return {
    type: PHOTOGALLERY_DELETE_SUCCESS,
    payload: galleries,
  };
};

export const photogalleryCreateFailure = (error) => {
  return {
    type: PHOTOGALLERY_CREATE_FAILURE,
    payload: error,
  };
};

export const photogalleryListFailure = (error) => {
  return {
    type: PHOTOGALLERY_LIST_FAILURE,
    payload: error,
  };
};

export const photogalleryUpdateFailure = (error) => {
  return {
    type: PHOTOGALLERY_UPDATE_FAILURE,
    payload: error,
  };
};

export const photogalleryDeleteFailure = (error) => {
  return {
    type: PHOTOGALLERY_DELETE_FAILURE,
    payload: error,
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

export const showLoadingPhotogalleryUpdate = () => {
  return {
    type: SHOW_LOADING_PHOTOGALLERY_UPDATE,
  };
};

export const showLoadingPhotogalleryDelete = () => {
  return {
    type: SHOW_LOADING_PHOTOGALLERY_DELETE,
  };
};
