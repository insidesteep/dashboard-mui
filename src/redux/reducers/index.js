import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import post from "./post";
import photogallery from "./photogallery";

const reducers = combineReducers({
  auth,
  category,
  post,
  photogallery
});

export default reducers;