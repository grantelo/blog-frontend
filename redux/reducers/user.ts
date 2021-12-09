import {IUser} from "../../models/IUser";
import {UserActions, UserActionTypes, UserState} from "../types/user";
import IError from "../../models/IError";


const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    error: {} as IError,
    isLoading: false,
}

const user = (state: UserState = initialState, action: UserActions): UserState => {
    switch (action.type) {

        case UserActionTypes.SET_IS_LOADING_USER:
            return {...state, isLoading: action.payload}

        case UserActionTypes.REQUEST_USER_LOGIN_SUCCESS: {
            return {...state, user: action.payload, error: {} as IError, isLoading: false}
        }

        case UserActionTypes.REQUEST_USER_REGISTRATION_SUCCESS: {
            return {...state, user: action.payload, error: {} as IError, isLoading: false}
        }

        case UserActionTypes.REQUEST_USER_REGISTRATION_ERROR: {
            return {...state, isLoading: false, error: action.payload}
        }

        case UserActionTypes.REQUEST_USER_LOGIN_ERROR: {
            return {...state, error: action.payload, isLoading: false}
        }

        default: {
            return state
        }
    }
}

export default user