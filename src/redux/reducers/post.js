import {
  POST_CREATE_SUCCESS,
  POST_CREATE_FAILURE,
  SHOW_LOADING_POST_CREATE,
  POST_LIST_SUCCESS,
  SHOW_LOADING_POST_LIST,
  POST_LIST_FAILURE,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  SHOW_LOADING_POST_DELETE,
  SHOW_LOADING_POST_UPDATE,
  POST_UPDATE_FAILURE,
  POST_UPDATE_SUCCESS,
} from "../constants/post";

const initState = {
  loading: false,
  error: {
    state: false,
    message: "",
  },
  posts: {
    loading: false,
    data: {
      all_items: 0,
      option: [],
    },
  },
};

const post = (state = initState, action) => {
  switch (action.type) {
    case POST_CREATE_SUCCESS:
    case POST_DELETE_SUCCESS:
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          state: false,
          message: "",
        },
        posts: {
          ...state.posts,
          data: action.payload,
        },
      };

    case POST_LIST_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.payload,
        },
      };

    case POST_CREATE_FAILURE:
    case POST_DELETE_FAILURE:
    case POST_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          state: true,
          message: action.payload,
        },
      };

    case POST_LIST_FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
        },
        error: {
          state: true,
          message: action.payload,
        },
      };

    case SHOW_LOADING_POST_CREATE:
    case SHOW_LOADING_POST_DELETE:
    case SHOW_LOADING_POST_UPDATE:
      return {
        ...state,
        loading: true,
      };

    case SHOW_LOADING_POST_LIST:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
        },
      };

    default:
      return state;
  }
};

export default post;
