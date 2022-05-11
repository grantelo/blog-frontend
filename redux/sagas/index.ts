import { all, spawn } from "redux-saga/effects";
import { loginSaga, registrationSaga, userUpdateProfileSaga } from "./userSaga";
import { initializeAppSaga } from "./app";
import { addPostSaga } from "./postSaga";
import {
  addCommentSaga,
  deleteCommentSaga,
  updateCommentSaga,
} from "./commentSaga";
import { requestDeleteMessageSaga, requestMessagesSaga, requestSendMessageSaga } from "./messageSaga";
import { requestDialogsSaga, requestDeleteDialogSaga, requestCreateDialogSaga, setCurrentDialogSaga } from "./dialogSaga";


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
    setCurrentDialogSaga
  ];

  yield all(sagas.map((saga) => spawn(saga)));
}
