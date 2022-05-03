import { all, spawn } from "redux-saga/effects";
import { loginSaga, registrationSaga, userUpdateProfileSaga } from "./userSaga";
import { initializeAppSaga } from "./app";
import { addPostSaga } from "./postSaga";
import {
  addCommentSaga,
  deleteCommentSaga,
  updateCommentSaga,
} from "./commentSaga";

export default function* rootSaga() {
  const sagas = [
    loginSaga,
    registrationSaga,
    initializeAppSaga,
    addPostSaga,
    addCommentSaga,
    updateCommentSaga,
    deleteCommentSaga,
    userUpdateProfileSaga,
  ];

  yield all(sagas.map((saga) => spawn(saga)));
}
