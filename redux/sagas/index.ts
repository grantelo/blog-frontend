import {all, spawn} from "redux-saga/effects"
import {loginSaga, registrationSaga} from "./userSaga";

export default function* rootSaga() {
    const sagas = [loginSaga, registrationSaga]

    yield all(sagas.map(saga => spawn(saga)))
}