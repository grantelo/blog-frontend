import {
    take,
    fork,
    call,
    put,
    cancel,
    CancelledEffect,
    cancelled, takeEvery, apply
} from "redux-saga/effects"
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

function* authorize(email: string, password: string) {
    try {
        yield put(setIsLoadingUser(true))
        const response: AxiosResponse<AuthResponse> = yield call(userApi.login, {email, password})
        yield put(requestUserLoginSuccessAction(response.data.user))
        yield apply(localStorage, localStorage.setItem, ["accessToken", response.data.accessToken])
    } catch (e: any) {
        yield put(requestUserLoginErrorAction(e?.response?.data))
    } finally {
        if ((yield cancelled()) as CancelledEffect) {
            yield put({type: UserActionTypes.SET_IS_LOADING_USER, payload: false})
        }
    }
}

function* registration({payload: {fullName, email, password}}: RequestUserRegistrationAction) {
    try {
        put(setIsLoadingUser(true))
        const response: AxiosResponse<RegistrationResponse> = yield call(userApi.registration, {fullName, email, password})
        yield put(requestUserRegistrationSuccessAction(response.data.user))
        yield apply(localStorage, localStorage.setItem, ["accessToken", response.data.accessToken])
    } catch (e: any) {
        yield put(requestUserRegistrationErrorAction(e.response.data))
    }
}

export function* loginSaga() {
    while (true) {
        const {payload: {email, password}}: RequestUserLoginAction = yield take(UserActionTypes.REQUEST_USER_LOGIN)
        const task: Task = yield fork(authorize, email, password)
        const action: RequestUserLogoutAction | RequestUserLoginErrorAction = yield take([UserActionTypes.REQUEST_USER_LOGOUT, UserActionTypes.REQUEST_USER_LOGIN_ERROR])

        if (action.type == UserActionTypes.REQUEST_USER_LOGOUT)
            yield cancel(task)

        yield apply(localStorage, localStorage.removeItem, ['accessToken'])
    }
}

export function* registrationSaga() {
    yield takeEvery(UserActionTypes.REQUEST_USER_REGISTRATION, registration)
}
