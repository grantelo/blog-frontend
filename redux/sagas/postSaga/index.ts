import Router from 'next/router'
import {call, put, takeEvery} from "redux-saga/effects";
import {PostActionTypes, RequestAddPostAction} from "../../types/post";
import {OutputData} from "@editorjs/editorjs";
import Api from "../../../utils/api";
import {AxiosResponse} from "axios";
import {CreatePostRequest} from "../../../models/request/CreatePostRequest";
import {requestAddPostError, requestAddPostSuccess, setIsLoadingPost} from "../../actions/post";
import IError from "../../../models/IError";
import {IPost} from "../../../models/IPost";

// function* fetchPosts() {
//     yield put()
// }
//
// export function* watchFetchPostsSuccess() {
//     yield takeEvery(PostActionTypes.REQUEST_POSTS, fetchPosts)
// }

export function* addPost({payload}: RequestAddPostAction) {
    try {
        yield put(setIsLoadingPost(true))
        const response: AxiosResponse<IPost> = yield call(Api().post.create, payload)
        yield put(requestAddPostSuccess())
        yield Router.push(`/write/${response.data.id}`)
    } catch (e) {
        yield put(requestAddPostError(e as IError))
    }
}

export function* addPostSaga() {
    yield takeEvery(PostActionTypes.REQUEST_ADD_POST, addPost)
}
