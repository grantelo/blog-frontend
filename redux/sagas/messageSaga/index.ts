import {call, put, takeEvery, select} from "redux-saga/effects";
import Api from "../../../utils/api";
import {AxiosResponse} from "axios";
import IError from "../../../models/IError";
import { deleteMessage, setIsLoadingDialog } from '../../actions/dialog';
import { MessageActionTypes, RequestDeleteMessageAction, RequestSendMessageAction } from '../../types/message';
import { addMessage, requestDeleteMessageError, requestDeleteMessageSuccess, requestMessagesError, requestMessagesSuccess, requestSendMessageError, requestSendMessageSuccess, setIsLoadingMessage } from '../../actions/message';
import { IMessage } from '../../../models/IMessage';
import { RootState } from '../../store';

export function* requestSendMessage({payload: text}: RequestSendMessageAction) {
    try {
        yield put(setIsLoadingDialog(true))
        const dialogId: number = yield select<(state: RootState) => number>((state) => state.dialog.currentDialogId);
        const response: AxiosResponse<IMessage> = yield call(Api().message.send, {text, dialogId})
        yield put(requestSendMessageSuccess(response.data))
        yield put(addMessage(response.data))
    } catch (e) {
        yield put(requestSendMessageError(e as IError))
    }
}

export function* requestSendMessageSaga() {
    yield takeEvery(MessageActionTypes.REQUEST_SEND_MESSAGE, requestSendMessage)
}

export function* requestDeleteMessage({payload: messageId}: RequestDeleteMessageAction) {
    try {
        yield put(setIsLoadingDialog(true))
        yield call(Api().message.delete, messageId)
        yield put(requestDeleteMessageSuccess(messageId))
        const dialogId: number = yield select<(state: RootState) => number>((state) => state.dialog.currentDialogId);
        const messages: IMessage[] = yield select<(state: RootState) => IMessage[]>(state => state.message.items)
        const lastMessage = messages[messages.length - 1]
        yield put(deleteMessage(dialogId, lastMessage))
    } catch (e) {
        yield put(requestDeleteMessageError(e as IError))
    }
}

export function* requestDeleteMessageSaga() {
    yield takeEvery(MessageActionTypes.REQUEST_DELETE_MESSAGE, requestDeleteMessage)
}

export function* requestMessages() {
    try {
        console.log("requestMessages");        
        yield put(setIsLoadingMessage(true))
        const dialogId: number = yield select<(state: RootState) => number>((state) => state.dialog.currentDialogId);
        const response: AxiosResponse<IMessage[]> = yield call(Api().message.findAllByDialog, dialogId)
        console.log(response.data);
        yield put(requestMessagesSuccess(response.data))
    } catch (e) {
        yield put(requestMessagesError(e as IError))
    }
}

export function* requestMessagesSaga() {
    yield takeEvery(MessageActionTypes.REQUEST_MESSAGES, requestMessages)
}


