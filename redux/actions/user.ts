import {
  LogoutUser,
  RequestUserLoginAction,
  RequestUserLoginErrorAction,
  RequestUserLoginSuccessAction,
  RequestUserLogoutAction,
  RequestUserRegistrationAction,
  RequestUserRegistrationErrorAction,
  RequestUserRegistrationSuccessAction,
  RequestUserUpdateProfileAction,
  RequestUserUpdateProfileActionError,
  RequestUserUpdateProfileActionSuccess,
  SetIsLoadingUser,
  SetUserAction,
  UserActionTypes,
} from "../types/user";
import LoginRequest from "../../models/request/LoginRequest";
import RegistrationRequest from "../../models/request/RegistrationRequest";
import { IUser } from "../../models/IUser";
import IError from "../../models/IError";
import { UpdateUserProfileRequest } from "../../models/request/UpdateProfileRequest";

export const setUserAction = (payload: IUser): SetUserAction => ({
  type: UserActionTypes.SET_USER,
  payload,
});

export const requestUserRegistrationAction = (
  payload: RegistrationRequest
): RequestUserRegistrationAction => ({
  type: UserActionTypes.REQUEST_USER_REGISTRATION,
  payload,
});

export const requestUserRegistrationSuccessAction = (
  payload: IUser
): RequestUserRegistrationSuccessAction => ({
  type: UserActionTypes.REQUEST_USER_REGISTRATION_SUCCESS,
  payload,
});

export const requestUserRegistrationErrorAction = (
  payload: IError
): RequestUserRegistrationErrorAction => ({
  type: UserActionTypes.REQUEST_USER_REGISTRATION_ERROR,
  payload,
});

export const requestUserLoginAction = (
  payload: LoginRequest
): RequestUserLoginAction => ({
  type: UserActionTypes.REQUEST_USER_LOGIN,
  payload,
});

export const requestUserLoginSuccessAction = (
  payload: IUser
): RequestUserLoginSuccessAction => ({
  type: UserActionTypes.REQUEST_USER_LOGIN_SUCCESS,
  payload,
});

export const requestUserLoginErrorAction = (
  payload: IError
): RequestUserLoginErrorAction => ({
  type: UserActionTypes.REQUEST_USER_LOGIN_ERROR,
  payload,
});

export const requestUserLogoutAction = (): RequestUserLogoutAction => ({
  type: UserActionTypes.REQUEST_USER_LOGOUT,
});

export const requestUserUpdateProfile = (
  payload: UpdateUserProfileRequest
): RequestUserUpdateProfileAction => ({
  type: UserActionTypes.REQUEST_USER_UPDATE_PROFILE,
  payload,
});

export const requestUserUpdateProfileSuccess = (
  payload: IUser
): RequestUserUpdateProfileActionSuccess => ({
  type: UserActionTypes.REQUEST_USER_UPDATE_PROFILE_SUCCESS,
  payload,
});

export const requestUserUpdateProfileError = (
  payload: IError
): RequestUserUpdateProfileActionError => ({
  type: UserActionTypes.REQUEST_USER_UPDATE_PROFILE_ERROR,
  payload,
});

export const setIsLoadingUser = (payload: boolean): SetIsLoadingUser => ({
  type: UserActionTypes.SET_IS_LOADING_USER,
  payload,
});

export const logoutUser = (): LogoutUser => ({
  type: UserActionTypes.LOGOUT_USER,
});
