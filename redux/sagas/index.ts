import {all, spawn} from "redux-saga/effects"
import {loginSaga, registrationSaga} from "./userSaga";
import {initializeAppSaga} from "./app";
import {addPostSaga} from "./postSaga";
import {addCommentSaga, updateComment, deleteComment} from "./commentSaga";

export default function* rootSaga() {
    const sagas = [
        loginSaga,
        registrationSaga,
        initializeAppSaga,
        addPostSaga,
        addCommentSaga,
        updateComment,
        deleteComment
    ]

    yield all(sagas.map(saga => spawn(saga)))
}
