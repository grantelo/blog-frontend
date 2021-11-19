import {IUser} from "../../models/IUser";
import {UserActions, UserActionTypes, UserState} from "../types/user";
import IError from "../../models/IError";

const initialState: UserState = {
    user: {} as IUser,
    error: {} as IError,
    isLoading: false,
}

const user = (state: UserState = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case UserActionTypes.REQUEST_USER_LOGIN_SUCCESS: {
            return {...state, user: action.payload, isLoading: true}
        }

        case UserActionTypes.REQUEST_USER_LOGIN_ERROR: {
            return {...state, error: action.payload, isLoading: true}
        }

        default: {
            return state
        }
    }
}

export default user