import AuthResponse from "../../models/response/AuthResponse";
import LoginRequest from "../../models/request/LoginRequest";
import RegistrationRequest from "../../models/request/RegistrationRequest";
import {IUser} from "../../models/IUser";
import IError from "../../models/IError";

export enum UserActionTypes {
    SET_USER = "SET_USER",
    SET_IS_LOADING_USER = "SET_IS_LOADING_USER",
    REQUEST_USER_REGISTRATION = "REQUEST_USERS_REGISTRATION",
    REQUEST_USER_REGISTRATION_SUCCESS = "REQUEST_USERS_REGISTRATION_SUCCESS",
    REQUEST_USER_REGISTRATION_ERROR = "REQUEST_USERS_REGISTRATION_ERROR",
    REQUEST_USER_LOGIN = "REQUEST_USER_LOGIN",
    REQUEST_USER_LOGIN_SUCCESS = "REQUEST_USER_SUCCESS",
    REQUEST_USER_LOGIN_ERROR = "REQUEST_USER_LOGIN_ERROR",
    REQUEST_USER_LOGOUT = "REQUEST_USER_LOGOUT",
    REQUEST_CHECK_AUTH_USER = "REQUEST_CHECK_AUTH_USER"
}

export interface UserState {
    user: IUser,
    isAuth: boolean,
    error: IError
    isLoading: boolean
}

export interface SetUserAction {
    type: UserActionTypes.SET_USER,
    payload: IUser
}

export interface RequestUserLoginAction {
    type: UserActionTypes.REQUEST_USER_LOGIN,
    payload: LoginRequest
}

export interface RequestUserLoginSuccessAction {
    type: UserActionTypes.REQUEST_USER_LOGIN_SUCCESS,
    payload: IUser
}

export interface RequestUserLoginErrorAction {
    type: UserActionTypes.REQUEST_USER_LOGIN_ERROR,
    payload: IError
}

export interface RequestUserRegistrationAction {
    type: UserActionTypes.REQUEST_USER_REGISTRATION,
    payload: RegistrationRequest
}

export interface RequestUserRegistrationSuccessAction {
    type: UserActionTypes.REQUEST_USER_REGISTRATION_SUCCESS,
    payload: IUser
}

export interface RequestUserRegistrationErrorAction {
    type: UserActionTypes.REQUEST_USER_REGISTRATION_ERROR,
    payload: IError
}

export interface RequestUserLogoutAction {
    type: UserActionTypes.REQUEST_USER_LOGOUT
}

export interface RequestCheckAuthUser {
    type: UserActionTypes.REQUEST_CHECK_AUTH_USER
}

export interface SetIsLoadingUser {
    type: UserActionTypes.SET_IS_LOADING_USER,
    payload: boolean
}

export type UserActions = SetUserAction
    | RequestUserLoginAction
    | RequestUserLoginSuccessAction
    | RequestUserLoginErrorAction
    | RequestUserRegistrationAction
    | RequestUserRegistrationSuccessAction
    | RequestUserRegistrationErrorAction
    | RequestUserLogoutAction
    | RequestCheckAuthUser
    | SetIsLoadingUser
