import {
    take,
    fork,
    call,
    put,
    cancel,
    CancelledEffect,
    cancelled, takeEvery, apply
} from "redux-saga/effects"
import {setCookie, destroyCookie} from "nookies"
import {Task} from '@redux-saga/types'
import {
    UserActionTypes,
    RequestUserLoginAction, RequestUserLogoutAction, RequestUserLoginErrorAction, RequestUserRegistrationAction
} from "../../types/user"
import userApi from "../../../utils/api/user"
import AuthResponse from "../../../models/response/AuthResponse"
import {AxiosResponse} from "axios"
import {
    requestUserLoginErrorAction,
    requestUserLoginSuccessAction,
    requestUserRegistrationErrorAction, requestUserRegistrationSuccessAction,
    setIsLoadingUser
} from "../../actions/user";
import {RegistrationResponse} from "../../../models/response/RegistrationResponse";
import Api from "../../../utils/api";

function* authorize(email: string, password: string) {
    try {
        yield put(setIsLoadingUser(true))
        console.log("aaaaaa")
        const response: AxiosResponse<AuthResponse> = yield call(Api().user.login, {email, password})
        console.log("dksadajasjdisjdisdishh")
        yield put(requestUserLoginSuccessAction(response.data.user))
        yield call(setCookie, null, "accessToken", response.data.accessToken)
    } catch (e: any) {
        console.log(e)
        yield put(requestUserLoginErrorAction(e?.response?.data))
    } finally {
        if ((yield cancelled()) as CancelledEffect) {
            yield put({type: UserActionTypes.SET_IS_LOADING_USER, payload: false})
        }
    }
}

function* registration({payload: {fullName, email, password}}: RequestUserRegistrationAction) {
    try {
        yield put(setIsLoadingUser(true))
        const response: AxiosResponse<RegistrationResponse> = yield call(Api().user.registration, {fullName, email, password})
        console.log(response.data)
        yield put(requestUserRegistrationSuccessAction(response.data.user))
        yield call(setCookie, null, "accessToken", response.data.accessToken)
    } catch (e: any) {
        yield put(requestUserRegistrationErrorAction(e.response.data))
    }
}

/*
export function* checkAuthUser() {
    try {
        const response: AxiosResponse<AuthResponse> = yield call(userApi.checkAuthUser)
        //nookies.set("accessToken", )
    } catch () {

    }
}
*/

export function* loginSaga() {
    while (true) {
        const {payload: {email, password}}: RequestUserLoginAction = yield take(UserActionTypes.REQUEST_USER_LOGIN)
        const task: Task = yield fork(authorize, email, password)
        const action: RequestUserLogoutAction | RequestUserLoginErrorAction = yield take([UserActionTypes.REQUEST_USER_LOGOUT, UserActionTypes.REQUEST_USER_LOGIN_ERROR])

        if (action.type == UserActionTypes.REQUEST_USER_LOGOUT)
            yield cancel(task)

        yield call(destroyCookie, null, "accessToken")
    }
}

export function* registrationSaga() {
    yield takeEvery(UserActionTypes.REQUEST_USER_REGISTRATION, registration)
}

/*export function* checkAuthUserSaga() {
    yield take(UserActionTypes.REQUEST_CHECK_AUTH_USER)
    yield fork(checkAuthUser)
}*/
