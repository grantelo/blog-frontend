import {
    PostActionTypes,
    RequestAddPostAction,
    RequestAddPostErrorAction,
    RequestAddPostSuccessAction,
    SetIsLoadingPost
} from "../types/post";
import {CreatePostRequest} from "../../models/request/CreatePostRequest";
import IError from "../../models/IError";

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
