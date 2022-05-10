import IError from "../../models/IError"
import { IMessage } from "../../models/IMessage"
import { AddMessageAction, MessageActionTypes, RequestDeleteMessageAction, RequestDeleteMessageErrorAction, RequestDeleteMessageSuccessAction, RequestMessagesAction, RequestMessagesErrorAction, RequestMessagesSuccessAction, RequestSendMessageAction, RequestSendMessageErrorAction, RequestSendMessageSuccessAction, SetIsLoadingMessageAction, SetReadedStatusLastMessagesAction } from "../types/message"

export const requestMessages = (): RequestMessagesAction => ({
    type: MessageActionTypes.REQUEST_MESSAGES,
})

export const requestMessagesSuccess = (payload: IMessage[]): RequestMessagesSuccessAction => ({
    type: MessageActionTypes.REQUEST_MESSAGES_SUCCESS,
    payload
})

export const requestMessagesError = (payload: IError): RequestMessagesErrorAction => ({
    type: MessageActionTypes.REQUEST_MESSAGES_ERROR,
    payload
})

export const requestDeleteMessage = (payload: number): RequestDeleteMessageAction => ({
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE,
    payload
})

export const requestDeleteMessageSuccess = (payload: number): RequestDeleteMessageSuccessAction => ({
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE_SUCCESS,
    payload
})

export const requestDeleteMessageError = (payload: IError): RequestDeleteMessageErrorAction => ({
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE_ERROR,
    payload
})

export const requestSendMessage = (payload: string): RequestSendMessageAction => ({
    type: MessageActionTypes.REQUEST_SEND_MESSAGE,
    payload
})

export const requestSendMessageSuccess = (payload: IMessage): RequestSendMessageSuccessAction => ({
    type: MessageActionTypes.REQUEST_SEND_MESSAGE_SUCCESS,
    payload
})

export const requestSendMessageError = (payload: IError): RequestSendMessageErrorAction => ({
    type: MessageActionTypes.REQUEST_SEND_MESSAGE_ERROR,
    payload
})

export const addMessage = (payload: IMessage): AddMessageAction => ({
    type: MessageActionTypes.ADD_MESSAGE,
    payload
})

export const setIsLoadingMessage = (payload: boolean): SetIsLoadingMessageAction => ({
    type: MessageActionTypes.SET_IS_LOADING_MESSAGE,
    payload
})

export const setReadedStatusLastMessages = (payload: number): SetReadedStatusLastMessagesAction => ({
    type: MessageActionTypes.SET_READED_STATUS_LAST_MESSAGES,
    payload
})