import { all, spawn } from "redux-saga/effects";
import { loginSaga, registrationSaga, userUpdateProfileSaga } from "./userSaga";
import { initializeAppSaga } from "./app";
import { addPostSaga } from "./postSaga";
import {
  addCommentSaga,
  deleteCommentSaga,
  updateCommentSaga,
} from "./commentSaga";
import { requestDialogsSaga, requestDeleteDialogSaga, requestCreateDialogSaga } from "./dialogSaga";
import { requestSendMessage, requestMessages, requestDeleteMessage } from "./messageSaga";

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
    requestDialogsSaga,
    requestDeleteDialogSaga, 
    requestCreateDialogSaga,
    requestSendMessage,
    requestMessages,
    requestDeleteMessage
  ];

  yield all(sagas.map((saga) => spawn(saga)));
}
