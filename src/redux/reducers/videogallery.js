import {
  VIDEOGALLERY_CREATE_SUCCESS,
  VIDEOGALLERY_CREATE_FAILURE,
  SHOW_LOADING_VIDEOGALLERY_CREATE,
  VIDEOGALLERY_LIST_SUCCESS,
  SHOW_LOADING_VIDEOGALLERY_LIST,
  VIDEOGALLERY_LIST_FAILURE,
  VIDEOGALLERY_DELETE_SUCCESS,
  VIDEOGALLERY_DELETE_FAILURE,
  SHOW_LOADING_VIDEOGALLERY_DELETE,
} from "../constants/videogallery";

const initState = {
  loading: false,
  error: false,
  videogallery: {
    loading: false,
    data: {
      all_items: 0,
      option: [],
    },
  },
};

const videogallery = (state = initState, action) => {
  switch (action.type) {
    case VIDEOGALLERY_CREATE_SUCCESS:
    case VIDEOGALLERY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        videogallery: {
          ...state.videogallery,
          data: action.payload,
        },
      };

    case VIDEOGALLERY_LIST_SUCCESS:
      return {
        ...state,
        videogallery: {
          loading: false,
          data: action.payload,
        },
      };

    case VIDEOGALLERY_CREATE_FAILURE:
    case VIDEOGALLERY_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case VIDEOGALLERY_LIST_FAILURE:
      return {
        ...state,
        videogallery: {
          ...state.videogallery,
          loading: false,
        },
      };

    case SHOW_LOADING_VIDEOGALLERY_CREATE:
    case SHOW_LOADING_VIDEOGALLERY_DELETE:
      return {
        ...state,
        loading: true,
      };

    case SHOW_LOADING_VIDEOGALLERY_LIST:
      return {
        ...state,
        videogallery: {
          ...state.videogallery,
          loading: true,
        },
      };

    default:
      return state;
  }
};

export default videogallery;
