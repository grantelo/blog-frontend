import {take, fork, call, put, cancel, ForkEffect, TakeEffect, StrictEffect, CancelledEffect, cancelled} from "redux-saga/effects"
import {Task} from '@redux-saga/types'
import {FetchUserLoginAction, UserActionTypes, FetchUserLogoutAction, FetchUserLoginErrorAction} from "../../types/user"
import userApi from "../../../utils/api/user"
import AuthResponse from "../../../models/response/AuthResponse"
import {AxiosResponse} from "axios"

function* authorize(email: string, password: string) {
    try {
        const response: AxiosResponse<AuthResponse> = yield call(userApi.login, {email, password})
        yield put({type: UserActionTypes.FETCH_USER_LOGIN_SUCCESS, payload: response.data.user})
        yield call(localStorage.setItem, "accessToken", response.data.accessToken)
        return response.data.accessToken
    } catch (e) {
        yield put({type: UserActionTypes.FETCH_USER_LOGIN_ERROR, payload: e})
    }
    finally {
        if((yield cancelled()) as CancelledEffect) {
            yield put({type: UserActionTypes.SET_IS_LOADING_USER, payload: false})
        }
    }
}

function* loginSaga() {
    while (true) {
        const {payload: {email, password}}: FetchUserLoginAction = yield take(UserActionTypes.FETCH_USER_LOGIN)
        const task: Task = yield fork(authorize, email, password)
        const action: FetchUserLogoutAction | FetchUserLoginErrorAction = yield take([UserActionTypes.FETCH_USER_LOGOUT, UserActionTypes.FETCH_USER_LOGIN_ERROR])

        if (action.type == UserActionTypes.FETCH_USER_LOGOUT)
            yield cancel(task)

        yield call(localStorage.removeItem, 'accessToken')
    }
}