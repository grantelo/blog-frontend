import {
    RequestUserLoginAction,
    RequestUserLoginErrorAction,
    RequestUserLoginSuccessAction,
    RequestUserLogoutAction,
    RequestUserRegistrationAction,
    RequestUserRegistrationErrorAction,
    RequestUserRegistrationSuccessAction,
    SetIsLoadingUser,
    SetUserAction,
    UserActionTypes
} from "../types/user";
import LoginRequest from "../../models/request/LoginRequest";
import RegistrationRequest from "../../models/request/RegistrationRequest";
import {IUser} from "../../models/IUser";
import IError from "../../models/IError";

export const setUserAction = (payload: IUser): SetUserAction => ({
    type: UserActionTypes.SET_USER,
    payload
})

export const requestUserRegistrationAction = (payload: RegistrationRequest): RequestUserRegistrationAction => ({
    type: UserActionTypes.REQUEST_USER_REGISTRATION,
    payload
})

export const requestUserRegistrationSuccessAction = (payload: IUser): RequestUserRegistrationSuccessAction => ({
    type: UserActionTypes.REQUEST_USER_REGISTRATION_SUCCESS,
    payload
})

export const requestUserRegistrationErrorAction = (payload: IError): RequestUserRegistrationErrorAction => ({
    type: UserActionTypes.REQUEST_USER_REGISTRATION_ERROR,
    payload
})

export const requestUserLoginAction = (payload: LoginRequest): RequestUserLoginAction => ({
    type: UserActionTypes.REQUEST_USER_LOGIN,
    payload
})

export const requestUserLoginSuccessAction = (payload: IUser): RequestUserLoginSuccessAction => ({
    type: UserActionTypes.REQUEST_USER_LOGIN_SUCCESS,
    payload
})

export const requestUserLoginErrorAction = (payload: IError): RequestUserLoginErrorAction => ({
    type: UserActionTypes.REQUEST_USER_LOGIN_ERROR,
    payload
})


export const requestUserLogoutAction = (): RequestUserLogoutAction => ({
    type: UserActionTypes.REQUEST_USER_LOGOUT
})

export const setIsLoadingUser = (payload: boolean): SetIsLoadingUser => ({
    type: UserActionTypes.SET_IS_LOADING_USER,
    payload
})
