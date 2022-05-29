import {
  call,
  cancel,
  cancelled,
  CancelledEffect,
  fork,
  put,
  take,
  takeEvery,
} from "redux-saga/effects";
import { destroyCookie, setCookie } from "nookies";
import { Task } from "@redux-saga/types";
import {
  RequestUserLoginAction,
  RequestUserLoginErrorAction,
  RequestUserLogoutAction,
  RequestUserRegistrationAction,
  RequestUserUpdateProfileAction,
  UserActionTypes,
} from "../../types/user";
import AuthResponse from "../../../models/response/AuthResponse";
import { AxiosResponse } from "axios";
import {
  logoutUser,
  requestUserLoginErrorAction,
  requestUserLoginSuccessAction,
  requestUserRegistrationErrorAction,
  requestUserRegistrationSuccessAction,
  requestUserUpdateProfileError,
  requestUserUpdateProfileSuccess,
  setIsLoadingUser,
} from "../../actions/user";
import { RegistrationResponse } from "../../../models/response/RegistrationResponse";
import Api from "../../../utils/api";
import { IUser } from "../../../models/IUser";

function* authorize(email: string, password: string) {
  try {
    yield put(setIsLoadingUser(true));
    console.log("aaaaaa");
    const response: AxiosResponse<AuthResponse> = yield call(Api().user.login, {
      email,
      password,
    });
    console.log("dksadajasjdisjdisdishh");
    yield put(requestUserLoginSuccessAction(response.data.user));
    yield call(setCookie, null, "accessToken", response.data.accessToken, {
      path: "/",
    });
  } catch (e: any) {
    console.log(e);
    yield put(requestUserLoginErrorAction(e?.response?.data));
  } finally {
    if ((yield cancelled()) as CancelledEffect) {
      yield put({ type: UserActionTypes.SET_IS_LOADING_USER, payload: false });
    }
  }
}

function* registration({
  payload: { fullName, email, password },
}: RequestUserRegistrationAction) {
  try {
    yield put(setIsLoadingUser(true));
    const response: AxiosResponse<RegistrationResponse> = yield call(
      Api().user.registration,
      { fullName, email, password }
    );
    console.log(response.data);
    yield put(requestUserRegistrationSuccessAction(response.data.user));
    yield call(setCookie, null, "accessToken", response.data.accessToken);
  } catch (e: any) {
    yield put(requestUserRegistrationErrorAction(e.response.data));
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

function* userProfileUpdate({
  payload: { fullName, avatar },
}: RequestUserUpdateProfileAction) {
  try {
    yield put(setIsLoadingUser(true));
    const response: AxiosResponse<IUser> = yield call(
      Api().user.updateProfile,
      { fullName, avatar }
    );

    yield put(requestUserUpdateProfileSuccess(response.data));
  } catch (e: any) {
    yield put(requestUserUpdateProfileError(e.response.data));
  }
}

function* logout() {
  yield call(destroyCookie, null, "accessToken");
  yield call(destroyCookie, null, "refreshToken");
  yield put(logoutUser());
}

export function* loginSaga() {
  while (true) {
    const {
      payload: { email, password },
    }: RequestUserLoginAction = yield take(UserActionTypes.REQUEST_USER_LOGIN);
    const task: Task = yield fork(authorize, email, password);
    const action: RequestUserLogoutAction | RequestUserLoginErrorAction =
      yield take([
        UserActionTypes.REQUEST_USER_LOGOUT,
        UserActionTypes.REQUEST_USER_LOGIN_ERROR,
      ]);

    if (action.type == UserActionTypes.REQUEST_USER_LOGOUT) yield cancel(task);

    yield call(destroyCookie, null, "accessToken");
  }
}

export function* logoutSaga() {
  yield takeEvery(UserActionTypes.REQUEST_USER_LOGOUT, logout);
}

export function* registrationSaga() {
  yield takeEvery(UserActionTypes.REQUEST_USER_REGISTRATION, registration);
}

export function* userUpdateProfileSaga() {
  yield takeEvery(
    UserActionTypes.REQUEST_USER_UPDATE_PROFILE,
    userProfileUpdate
  );
}

/*export function* checkAuthUserSaga() {
    yield take(UserActionTypes.REQUEST_CHECK_AUTH_USER)
    yield fork(checkAuthUser)
}*/
