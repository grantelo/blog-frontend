import {NextPageContext} from "next";
import nookies from 'nookies'
import {AppActionTypes} from "../../types/app";
import {take, put, fork} from "redux-saga/effects";
import {
    requestCheckAuthUser
} from "../../actions/user";


function* initializeApp(ctx: NextPageContext) {
    try {
        const cookies = nookies.get(ctx)
        if(cookies.accessToken) yield put(requestCheckAuthUser())
    } catch (e) {
        console.log(e)
    }
}

export function* initializeAppSaga() {
    const {payload: ctx} = yield take(AppActionTypes.INITIALIZE_APP)
    yield fork(initializeApp, ctx)
}