import { IDialog } from "../../models/IDialog";
import IError from "../../models/IError";
import { IMessage } from "../../models/IMessage";
import { CreateDialogRequest } from "../../models/request/CreateDialogRequest";
import { DialogActionTypes, RequestCreateDialogAction, RequestDeleteDialogAction, DeleteMessageAction, RequestDialogsAction, SetCurrentDialogAction, SetReadedStatusLastMessageAction, SetIsLoadingDialogAction, SetIsOnlineDialogAction, RequestDialogsSuccessAction, RequestDialogsErrorAction, RequestDeleteDialogSuccessAction, RequestDeleteDialogErrorAction, RequestCreateDialogSuccessAction, RequestCreateDialogErrorAction } from "../types/dialog";

export const requestDialogs = (): RequestDialogsAction => ({
    type: DialogActionTypes.REQUEST_DIALOGS,
})

export const requestDialogsSuccess = (payload: IDialog[]): RequestDialogsSuccessAction => ({
    type: DialogActionTypes.REQUEST_DIALOGS_SUCCESS,
    payload
})

export const requestDialogsError = (payload: IError): RequestDialogsErrorAction => ({
    type: DialogActionTypes.REQUEST_DIALOGS_ERROR,
    payload
})

export const requestDeleteDialog = (payload: number): RequestDeleteDialogAction => ({
    type: DialogActionTypes.REQUEST_DELETE_DIALOG,
    payload
})

export const requestDeleteDialogSuccess = (payload: number): RequestDeleteDialogSuccessAction => ({
    type: DialogActionTypes.REQUEST_DELETE_DIALOG_SUCCESS,
    payload
})

export const requestDeleteDialogError = (payload: IError): RequestDeleteDialogErrorAction => ({
    type: DialogActionTypes.REQUEST_DELETE_DIALOG_ERROR,
    payload
})

export const requestCreateDialog = (payload: CreateDialogRequest): RequestCreateDialogAction => ({
    type: DialogActionTypes.REQUEST_CREATE_DIALOG,
    payload
})

export const requestCreateDialogSuccess = (payload: IDialog): RequestCreateDialogSuccessAction => ({
    type: DialogActionTypes.REQUEST_CREATE_DIALOG_SUCCESS,
    payload
})

export const requestCreateDialogError = (payload: IError): RequestCreateDialogErrorAction => ({
    type: DialogActionTypes.REQUEST_CREATE_DIALOG_ERROR,
    payload
})

export const setCurrentDialog = (payload: number): SetCurrentDialogAction => ({
    type: DialogActionTypes.SET_CURRENT_DIALOG,
    payload
})

export const setReadedStatusLastMessage = (payload: number): SetReadedStatusLastMessageAction => ({
    type: DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE,
    payload
})

export const deleteMessage = (dialogId: number, message: IMessage): DeleteMessageAction => ({
    type: DialogActionTypes.DELETE_MESSAGE,
    payload: {
        dialogId,
        message
    }
})

export const setIsLoadingDialog = (payload: boolean) : SetIsLoadingDialogAction => ({
    type: DialogActionTypes.SET_IS_LOADING_DIALOG,
    payload
})

export const setIsOnline = (userId: number, isOnline: boolean) : SetIsOnlineDialogAction => ({
    type: DialogActionTypes.SET_IS_ONLINE,
    payload: {
        userId,
        isOnline
    }
})