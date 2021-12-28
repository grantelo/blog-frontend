import {all, spawn} from "redux-saga/effects"
import {loginSaga, registrationSaga} from "./userSaga";
import {initializeAppSaga} from "./app";

export default function* rootSaga() {
    const sagas = [loginSaga, registrationSaga, initializeAppSaga]

    yield all(sagas.map(saga => spawn(saga)))
}