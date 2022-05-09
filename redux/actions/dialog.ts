import { IMessage } from "../../models/IMessage";
import { CreateDialogRequest } from "../../models/request/CreateDialogRequest";
import { DialogActionTypes, RequestCreateDialogAction, RequestDeleteDialogAction, DeleteMessageAction, RequestDialogsAction, SetCurrentDialogAction, SetReadedStatusLastMessageAction, SetIsLoadingDialogAction, SetIsOnlineDialogAction } from "../types/dialog";

export const requestDialogs = (): RequestDialogsAction => ({
    type: DialogActionTypes.REQUEST_DIALOGS,
})

export const requestDeleteDialog = (payload: number): RequestDeleteDialogAction => ({
    type: DialogActionTypes.REQUEST_DELETE_DIALOG,
    payload
})

export const requesCreateDialog = (payload: CreateDialogRequest): RequestCreateDialogAction => ({
    type: DialogActionTypes.REQUEST_CREATE_DIALOG,
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

export const deleteMessage = (dialogId: number, messageId: number): DeleteMessageAction => ({
    type: DialogActionTypes.DELETE_MESSAGE,
    payload: {
        dialogId,
        messageId
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