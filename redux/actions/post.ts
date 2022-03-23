import {
    PostActionTypes,
    RequestAddPostAction,
    RequestAddPostErrorAction,
    RequestAddPostSuccessAction,
    RequestPostsErrorAction,
    RequestPostsSuccessAction,
    SetIsLoadingPost
} from "../types/post";
import {CreatePostRequest} from "../../models/request/CreatePostRequest";
import IError from "../../models/IError";
import { IPost } from "../../models/IPost";

export const requestPostsSuccess = (payload: IPost[]): RequestPostsSuccessAction => ({
    type: PostActionTypes.REQUEST_POSTS_SUCCESS,
    payload
})

export const requestPostsError = (payload: IError): RequestPostsErrorAction => ({
    type: PostActionTypes.REQUEST_POSTS_SUCCESS,
    payload
})

export const requestAddPost = (payload: CreatePostRequest): RequestAddPostAction => ({
    type: PostActionTypes.REQUEST_ADD_POST,
    payload
})

export const requestAddPostSuccess = (): RequestAddPostSuccessAction => ({
    type: PostActionTypes.REQUEST_ADD_POST_SUCCESS
})

export const requestAddPostError = (payload: IError): RequestAddPostErrorAction => ({
    type: PostActionTypes.REQUEST_ADD_POST_ERROR,
    payload
})

export const setIsLoadingPost = (payload: boolean): SetIsLoadingPost => ({
    type: PostActionTypes.SET_IS_LOADING_POST,
    payload
})

