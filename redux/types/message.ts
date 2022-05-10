import IError from "../../models/IError";
import {IMessage} from "../../models/IMessage";

export enum MessageActionTypes {
    SET_IS_LOADING_MESSAGE = "SET_IS_LOADING_MESSAGE",
    REQUEST_MESSAGES = "REQUEST_MESSAGES",
    REQUEST_MESSAGES_SUCCESS = "REQUEST_MESSAGES_SUCCESS",
    REQUEST_MESSAGES_ERROR = "REQUEST_MESSAGES_ERROR",
    REQUEST_DELETE_MESSAGE = "REQUEST_DELETE_MESSAGE",
    REQUEST_DELETE_MESSAGE_SUCCESS = "REQUEST_DELETE_MESSAGE_SUCCESS",
    REQUEST_DELETE_MESSAGE_ERROR = "REQUEST_DELETE_MESSAGE_ERROR",
    ADD_MESSAGE = "ADD_MESSAGE",
    REQUEST_SEND_MESSAGE = "REQUEST_SEND_MESSAGE",
    REQUEST_SEND_MESSAGE_SUCCESS = "REQUEST_SEND_MESSAGE_SUCCESS",
    REQUEST_SEND_MESSAGE_ERROR = "REQUEST_SEND_MESSAGES_ERROR",
    SET_READED_STATUS_LAST_MESSAGES = "SET_READED_STATUS_LAST_MESSAGES",
}

export interface MessageState {
    items: IMessage[],
    isLoading: boolean,
    error: IError | null
}

export interface SetIsLoadingMessageAction {
    type: MessageActionTypes.SET_IS_LOADING_MESSAGE,
    payload: boolean
}

export interface RequestMessagesAction {
    type: MessageActionTypes.REQUEST_MESSAGES,
}

export interface RequestMessagesSuccessAction {
    type: MessageActionTypes.REQUEST_MESSAGES_SUCCESS,
    payload: IMessage[]
}

export interface RequestMessagesErrorAction {
    type: MessageActionTypes.REQUEST_MESSAGES_ERROR,
    payload: IError
}


export interface RequestDeleteMessageAction {
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE,
    payload: number
}

export interface RequestDeleteMessageSuccessAction {
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE_SUCCESS,
    payload: number
}

export interface RequestDeleteMessageErrorAction {
    type: MessageActionTypes.REQUEST_DELETE_MESSAGE_ERROR,
    payload: IError
}

export interface AddMessageAction {
    type: MessageActionTypes.ADD_MESSAGE,
    payload: IMessage
}

export interface RequestSendMessageAction {
    type: MessageActionTypes.REQUEST_SEND_MESSAGE,
    payload: string
}

export interface RequestSendMessageSuccessAction {
    type: MessageActionTypes.REQUEST_SEND_MESSAGE_SUCCESS,
    payload: IMessage
}

export interface RequestSendMessageErrorAction {
    type: MessageActionTypes.REQUEST_SEND_MESSAGE_ERROR,
    payload: IError
}

export interface SetReadedStatusLastMessagesAction {
    type: MessageActionTypes.SET_READED_STATUS_LAST_MESSAGES,
    payload: number
}


export type MessageActions = SetIsLoadingMessageAction
    | RequestMessagesAction
    | RequestMessagesSuccessAction
    | RequestMessagesErrorAction
    | RequestDeleteMessageAction
    | RequestDeleteMessageSuccessAction
    | RequestDeleteMessageErrorAction
    | AddMessageAction
    | RequestSendMessageAction
    | RequestSendMessageSuccessAction
    | RequestSendMessageErrorAction
    | RequestMessagesErrorAction
    | SetReadedStatusLastMessagesAction