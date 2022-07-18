import {
  PHOTOGALLERY_CREATE_SUCCESS,
  PHOTOGALLERY_CREATE_FAILURE,
  SHOW_LOADING_PHOTOGALLERY_CREATE,
  PHOTOGALLERY_LIST_SUCCESS,
  SHOW_LOADING_PHOTOGALLERY_LIST,
  PHOTOGALLERY_LIST_FAILURE,
  PHOTOGALLERY_DELETE_SUCCESS,
  PHOTOGALLERY_DELETE_FAILURE,
  SHOW_LOADING_PHOTOGALLERY_DELETE,
  PHOTOGALLERY_UPDATE_SUCCESS,
  PHOTOGALLERY_UPDATE_FAILURE,
  SHOW_LOADING_PHOTOGALLERY_UPDATE,
} from "../constants/photogallery";

const initState = {
  loading: false,
  error: false,
  photogallery: {
    loading: false,
    data: {
      all_items: 0,
      option: [],
    },
  },
};

const photogallery = (state = initState, action) => {
  switch (action.type) {
    case PHOTOGALLERY_CREATE_SUCCESS:
    case PHOTOGALLERY_UPDATE_SUCCESS:
    case PHOTOGALLERY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          state: false,
          message: "",
        },
        photogallery: {
          ...state.photogallery,
          data: action.payload,
        },
      };

    case PHOTOGALLERY_LIST_SUCCESS:
      return {
        ...state,
        photogallery: {
          loading: false,
          data: action.payload,
        },
      };

    case PHOTOGALLERY_CREATE_FAILURE:
    case PHOTOGALLERY_UPDATE_FAILURE:
    case PHOTOGALLERY_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          state: true,
          message: action.payload,
        },
      };

    case PHOTOGALLERY_LIST_FAILURE:
      return {
        ...state,
        photogallery: {
          ...state.photogallery,
          loading: false,
        },
        error: {
          state: true,
          message: action.payload,
        },
      };

    case SHOW_LOADING_PHOTOGALLERY_CREATE:
    case SHOW_LOADING_PHOTOGALLERY_UPDATE:
    case SHOW_LOADING_PHOTOGALLERY_DELETE:
      return {
        ...state,
        loading: true,
      };

    case SHOW_LOADING_PHOTOGALLERY_LIST:
      return {
        ...state,
        photogallery: {
          ...state.photogallery,
          loading: true,
        },
      };

    default:
      return state;
  }
};

export default photogallery;
