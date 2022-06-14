import {
  PHOTOGALLERY_CREATE_SUCCESS,
  PHOTOGALLERY_CREATE_FAILURE,
  SHOW_LOADING_PHOTOGALLERY_CREATE,
  PHOTOGALLERY_LIST_SUCCESS,
  SHOW_LOADING_PHOTOGALLERY_LIST,
} from "../constants/photogallery";

const initState = {
  loading: false,
  error: false,
  photogallery: {
    loading: false,
    data: [],
  },
};

const photogallery = (state = initState, action) => {
  switch (action.type) {
    case PHOTOGALLERY_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
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
      return {
        ...state,
        loading: false,
        error: true,
      };

    case PHOTOGALLERY_CREATE_FAILURE:
      return {
        ...state,
        photogallery: {
          ...state.photogallery,
          loading: false,
        },
      };

    case SHOW_LOADING_PHOTOGALLERY_CREATE: {
      return {
        ...state,
        loading: true,
      };
    }

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
