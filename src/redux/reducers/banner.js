import {
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAILURE,
  SHOW_LOADING_BANNER_CREATE,
  BANNER_LIST_SUCCESS,
  SHOW_LOADING_BANNER_LIST,
  BANNER_LIST_FAILURE,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAILURE,
  SHOW_LOADING_BANNER_DELETE,
  SHOW_LOADING_BANNER_UPDATE,
  BANNER_UPDATE_FAILURE,
  BANNER_UPDATE_SUCCESS,
} from "../constants/banner";

const initState = {
  loading: false,
  error: {
    state: false,
    message: "",
  },
  banners: {
    loading: false,
    data: [],
  },
};

const banner = (state = initState, action) => {
  switch (action.type) {
    case BANNER_CREATE_SUCCESS:
    case BANNER_DELETE_SUCCESS:
    case BANNER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          state: false,
          message: "",
        },
        banners: {
          ...state.banners,
          data: action.payload,
        },
      };

    case BANNER_LIST_SUCCESS:
      return {
        ...state,
        banners: {
          loading: false,
          data: action.payload,
        },
      };

    case BANNER_CREATE_FAILURE:
    case BANNER_DELETE_FAILURE:
    case BANNER_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          state: true,
          message: action.payload,
        },
      };

    case BANNER_LIST_FAILURE:
      return {
        ...state,
        banners: {
          ...state.banners,
          loading: false,
        },
        error: {
          state: true,
          message: action.payload,
        },
      };

    case SHOW_LOADING_BANNER_CREATE:
    case SHOW_LOADING_BANNER_DELETE:
    case SHOW_LOADING_BANNER_UPDATE:
      return {
        ...state,
        loading: true,
      };

    case SHOW_LOADING_BANNER_LIST:
      return {
        ...state,
        banners: {
          ...state.banners,
          loading: true,
        },
      };

    default:
      return state;
  }
};

export default banner;
