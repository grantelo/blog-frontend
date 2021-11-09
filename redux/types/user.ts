import AuthResponse from "../../models/response/AuthResponse";
import LoginRequest from "../../models/request/LoginRequest";

export enum UserActionTypes {
    SET_IS_LOADING_USER = "SET_IS_LOADING_USER",
    FETCH_USER_REGISTRATION = "FETCH_USERS_REGISTRATION",
    FETCH_USER_LOGIN = "FETCH_USER_LOGIN",
    FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_LOGIN_ERROR = "FETCH_USER_ERROR",
    FETCH_USER_LOGOUT = "FETCH_USER_LOGOUT",
}

export interface FetchUserLoginAction {
    type: UserActionTypes.FETCH_USER_LOGIN,
    payload: LoginRequest
}

export interface FetchUserLoginSuccessAction {
    type: UserActionTypes.FETCH_USER_LOGIN_SUCCESS,
    payload: AuthResponse
}

export interface FetchUserLoginErrorAction {
    type: UserActionTypes.FETCH_USER_LOGIN_ERROR,
    payload: Error
}

export interface FetchUserLogoutAction {
    type: UserActionTypes.FETCH_USER_LOGOUT
}

export interface SetIsLoadingUser {
    type: UserActionTypes.SET_IS_LOADING_USER,
    payload: boolean
}