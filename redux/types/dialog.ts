import {IDialog} from "../../models/IDialog";
import IError from "../../models/IError";
import {IMessage} from "../../models/IMessage";
import { CreateDialogRequest } from "../../models/request/CreateDialogRequest";

export enum DialogActionTypes {
    REQUEST_DIALOGS = "REQUEST_DIALOGS",
    REQUEST_DIALOGS_SUCCESS = "REQUEST_DIALOGS_SUCCESS",
    REQUEST_DIALOGS_ERROR = "REQUEST_DIALOGS_ERROR",
    SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG",
    SET_IS_ONLINE = "SET_IS_ONLINE",
    SET_IS_LOADING_DIALOG = "SET_IS_LOADING_DIALOG",
    REQUEST_DELETE_DIALOG = "REQUEST_DELETE_DIALOG",
    REQUEST_DELETE_DIALOG_SUCCESS = "REQUEST_DELETE_DIALOG_SUCCESS",
    REQUEST_DELETE_DIALOG_ERROR = "REQUEST_DELETE_DIALOG_ERROR",
    SET_READED_STATUS_LAST_MESSAGE = "SET_READED_STATUS_LAST_MESSAGE",
    DELETE_MESSAGE = "DELETE_MESSAGE",
    // REQUEST_DELETE_MESSAGE_SUCCESS = "REQUEST_DELETE_MESSAGE_SUCCESS",
    // REQUEST_DELETE_MESSAGE_ERROR = "REQUEST_DELETE_MESSAGE_ERROR",
    REQUEST_CREATE_DIALOG = "REQUEST_CREATE_DIALOG",
    REQUEST_CREATE_DIALOG_SUCCESS = "REQUEST_CREATE_DIALOG_SUCCESS",
    REQUEST_CREATE_DIALOG_ERROR = "REQUEST_CREATE_DIALOG_ERROR"
}

export interface DialogState {
    items: IDialog[],
    currentDialogId: string
    isLoading: boolean,
    error: IError | null
}

export interface RequestDialogsAction {
    type: DialogActionTypes.REQUEST_DIALOGS,
}

export interface RequestDialogsSuccessAction {
    type: DialogActionTypes.REQUEST_DIALOGS_SUCCESS,
    payload: IDialog[]
}

export interface RequestDialogsErrorAction {
    type: DialogActionTypes.REQUEST_DIALOGS_ERROR,
    payload: IError
}

export interface RequestDeleteDialogAction {
    type: DialogActionTypes.REQUEST_DELETE_DIALOG,
    payload: number
}

export interface RequestDeleteDialogSuccessAction {
    type: DialogActionTypes.REQUEST_DELETE_DIALOG_SUCCESS,
}

export interface RequestDeleteDialogErrorAction {
    type: DialogActionTypes.REQUEST_DELETE_DIALOG_ERROR,
    paylod: IError
}

export interface SetIsLoadingDialogAction {
    type: DialogActionTypes.SET_IS_LOADING_DIALOG,
    payload: boolean
}

export interface SetCurrentDialogAction {
    type: DialogActionTypes.SET_CURRENT_DIALOG,
    payload: number
}

export interface SetIsOnlineDialogAction {
    type: DialogActionTypes.SET_IS_ONLINE,
    payload: {
        userId: number,
        isOnline: boolean
    }
}

export interface SetReadedStatusLastMessageAction {
    type: DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE,
    payload: number
}

export interface DeleteMessageAction {
    type: DialogActionTypes.DELETE_MESSAGE,
    payload: {
        messageId: number,
        dialogId: number
    }
}

// export interface RequestDeleteMessageSuccessAction {
//     type: DialogActionTypes.REQUEST_DELETE_MESSAGE_SUCCESS,
// }

// export interface RequestDeleteMessageErrorAction {
//     type: DialogActionTypes.REQUEST_DELETE_MESSAGE_ERROR,
//     payload: IError
// }

export interface RequestCreateDialogAction {
    type: DialogActionTypes.REQUEST_CREATE_DIALOG,
    payload: CreateDialogRequest
}

export interface RequestCreateDialogSuccessAction {
    type: DialogActionTypes.REQUEST_CREATE_DIALOG_SUCCESS,
    payload: IDialog
}

export interface RequestCreateDialogErrorAction {
    type: DialogActionTypes.REQUEST_CREATE_DIALOG_ERROR,
    payload: IError
}

export type DialogActions = RequestDialogsAction |
    RequestDialogsSuccessAction |
    RequestDialogsErrorAction |
    RequestDeleteDialogSuccessAction |
    RequestDeleteDialogErrorAction |
    SetIsLoadingDialogAction |
    SetCurrentDialogAction |
    SetReadedStatusLastMessageAction |
    DeleteMessageAction |
    // RequestDeleteMessageSuccessAction |
    // RequestDeleteMessageErrorAction |
    SetIsOnlineDialogAction |
    RequestCreateDialogSuccessAction |
    RequestCreateDialogErrorAction