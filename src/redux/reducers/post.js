import {
  POST_CREATE_SUCCESS,
  POST_CREATE_FAILURE,
  SHOW_LOADING_POST_CREATE,
  POST_LIST_SUCCESS,
  SHOW_LOADING_POST_LIST,
} from "../constants/post";

const initState = {
  loading: false,
  error: false,
  posts: {
    loading: false,
    data: [],
  },
};

const post = (state = initState, action) => {
  switch (action.type) {
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
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
      return {
        ...state,
        loading: false,
        error: true,
      };

    case POST_CREATE_FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false
        }
      };

    case SHOW_LOADING_POST_CREATE: {
      return {
        ...state,
        loading: true,
      };
    }

    case SHOW_LOADING_POST_LIST:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true
        }
      };

    default:
      return state;
  }
};

export default post;
