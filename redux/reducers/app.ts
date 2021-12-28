import {AppActions, AppActionTypes, AppState} from "../types/app";
import {AnyAction} from "redux";
import {HYDRATE} from "next-redux-wrapper";

const initialState: AppState = {
    initialized: false
}

const app = (state: AppState = initialState, action: AnyAction): AppState => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload.app}
        case AppActionTypes.INITIALIZED_APP_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

export default app