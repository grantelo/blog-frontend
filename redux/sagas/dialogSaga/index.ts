import Router from 'next/router'
import {call, put, takeEvery} from "redux-saga/effects";
import Api from "../../../utils/api";
import {AxiosResponse} from "axios";
import {requestAddPostError, requestAddPostSuccess, setIsLoadingPost} from "../../actions/post";
import IError from "../../../models/IError";
import {IPost} from "../../../models/IPost";
import { DialogActionTypes, RequestCreateDialogAction, RequestDeleteDialogAction, RequestDialogsAction } from '../../types/dialog';
import { requestCreateDialogError, requestCreateDialogSuccess, requestDeleteDialogError, requestDeleteDialogSuccess, requestDialogsError, requestDialogsSuccess, setIsLoadingDialog } from '../../actions/dialog';
import { IDialog } from '../../../models/IDialog';

export function* requestCreateDialog({payload}: RequestCreateDialogAction) {
    try {
        yield put(setIsLoadingDialog(true))
        const response: AxiosResponse<IDialog> =  yield call(Api().dialog.create, payload)
        yield put(requestCreateDialogSuccess(response.data))
    } catch (e) {
        yield put(requestCreateDialogError(e as IError))
    }
}

export function* requestCreateDialogSaga() {
    yield takeEvery(DialogActionTypes.REQUEST_CREATE_DIALOG, requestCreateDialog)
}

export function* requestDeleteDialog({payload: dialogId}: RequestDeleteDialogAction) {
    try {
        yield put(setIsLoadingDialog(true))
        yield call(Api().dialog.delete, dialogId)
        yield put(requestDeleteDialogSuccess(dialogId))
    } catch (e) {
        yield put(requestDeleteDialogError(e as IError))
    }
}

export function* requestDeleteDialogSaga() {
    yield takeEvery(DialogActionTypes.REQUEST_DELETE_DIALOG, requestDeleteDialog)
}

export function* requestDialogs() {
    try {
        yield put(setIsLoadingDialog(true))
        const response: AxiosResponse<IDialog[]> = yield call(Api().dialog.findAll)
        yield put(requestDialogsSuccess(response.data))
    } catch (e) {
        yield put(requestDialogsError(e as IError))
    }
}

export function* requestDialogsSaga() {
    yield takeEvery(DialogActionTypes.REQUEST_DIALOGS, requestDialogs)
}
