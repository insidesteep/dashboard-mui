import { SHOW_LOADING_PHOTOGALLERY_DELETE } from "../constants/photogallery";
import {
  VIDEOGALLERY_CREATE,
  VIDEOGALLERY_CREATE_FAILURE,
  VIDEOGALLERY_CREATE_SUCCESS,
  VIDEOGALLERY_LIST,
  VIDEOGALLERY_LIST_FAILURE,
  VIDEOGALLERY_LIST_SUCCESS,
  SHOW_LOADING_VIDEOGALLERY_CREATE,
  SHOW_LOADING_VIDEOGALLERY_LIST,
  VIDEOGALLERY_DELETE,
  VIDEOGALLERY_DELETE_SUCCESS,
  VIDEOGALLERY_DELETE_FAILURE,
} from "../constants/videogallery";

export const videogalleryCreate = (data, cb) => {
  return {
    type: VIDEOGALLERY_CREATE,
    payload: { data, cb },
  };
};

export const videogalleryList = () => {
  return {
    type: VIDEOGALLERY_LIST,
  };
};

export const videogalleryDelete = (id) => {
  return {
    type: VIDEOGALLERY_DELETE,
    payload: id,
  };
};

export const videogalleryCreateSuccess = (videoData) => {
  return {
    type: VIDEOGALLERY_CREATE_SUCCESS,
    payload: videoData,
  };
};

export const videogalleryListSuccess = (videos) => {
  return {
    type: VIDEOGALLERY_LIST_SUCCESS,
    payload: videos,
  };
};

export const videogalleryDeleteSuccess = (videos) => {
  return {
    type: VIDEOGALLERY_DELETE_SUCCESS,
    payload: videos,
  };
};

export const videogalleryCreateFailure = () => {
  return {
    type: VIDEOGALLERY_CREATE_FAILURE,
  };
};

export const videogalleryListFailure = () => {
  return {
    type: VIDEOGALLERY_LIST_FAILURE,
  };
};

export const videogalleryDeleteFailure = () => {
  return {
    type: VIDEOGALLERY_DELETE_FAILURE,
  };
};

export const showLoadingvideogalleryCreate = () => {
  return {
    type: SHOW_LOADING_VIDEOGALLERY_CREATE,
  };
};

export const showLoadingvideogalleryList = () => {
  return {
    type: SHOW_LOADING_VIDEOGALLERY_LIST,
  };
};

export const showLoadingvideogalleryDelete = () => {
  return {
    type: SHOW_LOADING_PHOTOGALLERY_DELETE,
  };
};
