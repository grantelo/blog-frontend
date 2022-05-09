import { IMessage } from "../../models/IMessage"
import { SendMessageRequest } from "../../models/request/SendMessageRequest"
import { AddMessageAction, MessageActions, MessageActionTypes, RequestDeleteMessageAction, RequestMessagesAction, RequestSendMessageAction, SetIsLoadingMessageAction, SetReadedStatusLastMessagesAction } from "../types/message"

export const requestMessages = (payload: number): RequestMessagesAction => ({
    type: MessageActionTypes.REQUEST_MESSAGES,
    payload
})

export const requestDeleteMessage = (payload: number): RequestDeleteMessageAction => ({
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE,
    payload
})

export const requestSendMessage = (payload: SendMessageRequest): RequestSendMessageAction => ({
    type: MessageActionTypes.REQUEST_SEND_MESSAGE,
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