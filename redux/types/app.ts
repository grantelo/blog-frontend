import {NextPageContext} from "next";

export enum AppActionTypes {
    INITIALIZE_APP = "INITIALIZE_APP",
    INITIALIZED_APP_SUCCESS = "INITIALIZE_APP_SUCCESS"
}

export interface AppState {
    initialized: boolean
}

export interface InitializeApp {
    type: AppActionTypes.INITIALIZE_APP,
    payload: NextPageContext
}

export interface InitializedAppSuccess {
    type: AppActionTypes.INITIALIZED_APP_SUCCESS
}

export type AppActions = InitializeApp | InitializedAppSuccess