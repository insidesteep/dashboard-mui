import {
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  SHOW_LOADING_CATEGORY_CREATE,
  CATEGORY_LIST_SUCCESS,
  SHOW_LOADING_CATEGORY_LIST,
} from "../constants/category";

const initState = {
  loading: false,
  error: false,
  categories: {
    loading: false,
    data: [],
  },
};

const category = (state = initState, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        categories: {
          ...state.categories,
          data: action.payload,
        },
      };

    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: {
          loading: false,
          data: action.payload,
        },
      };

    case CATEGORY_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case CATEGORY_CREATE_FAILURE:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false
        }
      };

    case SHOW_LOADING_CATEGORY_CREATE: {
      return {
        ...state,
        loading: true,
      };
    }

    case SHOW_LOADING_CATEGORY_LIST:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true
        }
      };

    default:
      return state;
  }
};

export default category;
