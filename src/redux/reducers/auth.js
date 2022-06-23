import {
  SIGNOUT,
  SIGNIN_SUCCESS,
  SHOW_LOADING,
  AUTH_TOKEN,
  SIGNIN_FAILURE,
} from "../constants/auth";

const initState = {
  loading: false,
  error: { status: false, message: "" },
  redirect: "",
  token: localStorage.getItem(AUTH_TOKEN),
  userInfo: null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: "",
        },
        userInfo: action.payload.userInfo,
        token: action.payload.token,
      };

    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      };

    case SIGNOUT:
      localStorage.removeItem(AUTH_TOKEN);

      return initState;

    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    default:
      return state;
  }
};

export default auth;
