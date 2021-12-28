import {AppActionTypes, InitializeApp, InitializedAppSuccess} from "../types/app";
import {NextPageContext} from "next";

export const initializationApp = (payload: NextPageContext): InitializeApp => ({
    type: AppActionTypes.INITIALIZE_APP,
    payload
})

export const initializationAppSuccess = (): InitializedAppSuccess => ({
    type: AppActionTypes.INITIALIZED_APP_SUCCESS
})