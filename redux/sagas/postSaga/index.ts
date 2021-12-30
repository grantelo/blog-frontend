import {call, takeEvery} from "redux-saga/effects";
import {PostActionTypes} from "../../types/post";

function* fetchPosts() {
    yield call()
}

export function* watchFetchPosts() {
    yield takeEvery(PostActionTypes.REQUEST_POSTS, fetchPosts)
}