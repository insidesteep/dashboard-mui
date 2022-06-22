import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import post from "./post";
import photogallery from "./photogallery";
import videogallery from "./videogallery";

const reducers = combineReducers({
  auth,
  category,
  post,
  photogallery,
  videogallery
});

export default reducers;