import { IUser } from "../../models/IUser";
import { UserActionTypes, UserState } from "../types/user";
import IError from "../../models/IError";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

const initialState: UserState = {
  user: {} as IUser,
  isAuth: false,
  error: {} as IError,
  isLoading: false,
};

const user = (
  state: UserState = initialState,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };

    case UserActionTypes.SET_USER:
      return { ...state, user: action.payload, isAuth: true };

    case UserActionTypes.SET_IS_LOADING_USER:
      return { ...state, isLoading: action.payload };

    case UserActionTypes.REQUEST_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: {} as IError,
        isLoading: false,
        isAuth: true,
      };
    }

    case UserActionTypes.REQUEST_USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: {} as IError,
        isLoading: false,
        isAuth: true,
      };
    }

    case UserActionTypes.REQUEST_USER_REGISTRATION_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case UserActionTypes.REQUEST_USER_LOGIN_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }

    case UserActionTypes.REQUEST_USER_UPDATE_PROFILE_SUCCESS: {
      return { ...state, user: action.payload, isLoading: false };
    }

    case UserActionTypes.REQUEST_USER_UPDATE_PROFILE_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }

    default: {
      return state;
    }
  }
};

export default user;
