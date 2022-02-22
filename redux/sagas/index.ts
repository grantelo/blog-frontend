import {all, spawn} from "redux-saga/effects"
import {loginSaga, registrationSaga} from "./userSaga";
import {initializeAppSaga} from "./app";
import {addPostSaga} from "./postSaga";

export default function* rootSaga() {
    const sagas = [loginSaga, registrationSaga, initializeAppSaga, addPostSaga]

    yield all(sagas.map(saga => spawn(saga)))
}
