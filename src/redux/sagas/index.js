import { all } from "redux-saga/effects";
import auth from "./auth";
import category from "./category";
import post from "./post";
import photogallery from "./photogallery";
// import subject from "./subject";
// import question from "./question";

export default function* rootSaga(getState) {
  yield all([auth(), category(), post(), photogallery()]);
}
