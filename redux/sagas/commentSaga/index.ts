import { AxiosResponse } from "axios";
import {call, put, takeEvery } from "redux-saga/effects";
import { IComment } from "../../../models/IComment";
import Api from "../../../utils/api/index";
import {CommentActionTypes, RequstAddCommentAction, RequstDeleteCommentAction, RequstUpdateCommentAction} from "../../types/comment";
import {setIsLoadingCommentAction, requestAddCommentErrorAction, requestAddCommentSuccessAction, requestUpdateCommentSuccessAction, requestUpdateCommentErrorAction} from "../../actions/comment";
import IError from "../../../models/IError";

export function* addComment({payload}: RequstAddCommentAction) {
    try {
        console.log("dhsaudsuaudgsa")
        yield put(setIsLoadingCommentAction(true))
        const response: AxiosResponse<IComment> = yield call(Api().comment.create, payload)
        yield put(requestAddCommentSuccessAction(response.data))
    } catch (e) {
        yield put(requestAddCommentErrorAction(e as IError))
    }
}

export function* addCommentSaga() {
    yield takeEvery(CommentActionTypes.REQUEST_ADD_COMMENT, addComment)
}

export function* updateComment({payload}: RequstUpdateCommentAction) {
    try {
        yield put(setIsLoadingCommentAction(true))
        const response: AxiosResponse<IComment> = yield call(Api().comment.update, payload.id, payload.dto)
        yield put(requestUpdateCommentSuccessAction(response.data))
    } catch (e) {
        yield put(requestUpdateCommentErrorAction(e as IError))
    }
}

export function* updateCommentSaga() {
    yield takeEvery(CommentActionTypes.REQUEST_UPDATE_COMMENT, deleteComment)
}

export function* deleteComment({payload}: RequstDeleteCommentAction) {
    try {
        yield put(setIsLoadingCommentAction(true))
        const response: AxiosResponse<IComment> = yield call(Api().comment.delete, payload)
        yield put(requestAddCommentSuccessAction(response.data))
    } catch (e) {
        yield put(requestAddCommentErrorAction(e as IError))
    }
}

export function* deleteCommentSaga() {
    yield (CommentActionTypes.REQUEST_DELETE_COMMENT, deleteComment)
}


