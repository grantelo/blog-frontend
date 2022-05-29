import { all, spawn } from "redux-saga/effects";
import {
  loginSaga,
  logoutSaga,
  registrationSaga,
  userUpdateProfileSaga,
} from "./userSaga";
import { initializeAppSaga } from "./app";
import { addPostSaga } from "./postSaga";
import {
  addCommentSaga,
  deleteCommentSaga,
  updateCommentSaga,
} from "./commentSaga";
import {
  requestDeleteMessageSaga,
  requestMessagesSaga,
  requestSendMessageSaga,
} from "./messageSaga";
import {
  requestCreateDialogSaga,
  requestDeleteDialogSaga,
  requestDialogsSaga,
  setCurrentDialogSaga,
} from "./dialogSaga";

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
    requestSendMessageSaga,
    requestMessagesSaga,
    requestDeleteMessageSaga,
    requestDialogsSaga,
    requestDeleteDialogSaga,
    requestCreateDialogSaga,
    setCurrentDialogSaga,
    logoutSaga,
  ];

  yield all(sagas.map((saga) => spawn(saga)));
}
