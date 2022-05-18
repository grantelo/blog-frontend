import IError from "../../models/IError";
import { IPost } from "../../models/IPost";
import { CreatePostRequest } from "../../models/request/CreatePostRequest";

export enum PostActionTypes {
  SET_IS_LOADING_POST = "SET_IS_LOADING_POST",
  REQUEST_POSTS_SUCCESS = "REQUEST_POSTS_SUCCESS",
  REQUEST_POSTS_ERROR = "REQUEST_POSTS_ERROR",
  REQUEST_POST = "REQUEST_POST",
  REQUEST_POST_SUCCESS = "REQUEST_POST_SUCCESS",
  REQUEST_POST_ERROR = "REQUEST_POST_ERROR",
  REQUEST_ADD_POST = "REQUEST_ADD_POST",
  REQUEST_ADD_POST_SUCCESS = "REQUEST_ADD_POST_SUCCESS",
  REQUEST_ADD_POST_ERROR = "REQUEST_ADD_POST_ERROR",
  REQUEST_UPDATE_POST = "REQUEST_UPDATE_POST",
  REQUEST_UPDATE_POST_SUCCESS = "REQUEST_UPDATE_POST_SUCCESS",
  REQUEST_UPDATE_POST_ERROR = "REQUEST_UPDATE_POST_ERROR",
  REQUEST_DELETE_POST = "REQUEST_DELETE_POST",
  REQUEST_DELETE_POST_SUCCESS = "REQUEST_DELETE_POST_SUCCESS",
  REQUEST_DELETE_POST_ERROR = "REQUEST_DELETE_POST_ERROR",
}

export interface PostState {
  items: IPost[];
  isLoading: boolean;
  error: IError | null;
}

export interface RequestPostsSuccessAction {
  type: PostActionTypes.REQUEST_POSTS_SUCCESS;
  payload: IPost[];
}

export interface RequestPostsErrorAction {
  type: PostActionTypes.REQUEST_POSTS_SUCCESS;
  payload: IError;
}

export interface RequestAddPostAction {
  type: PostActionTypes.REQUEST_ADD_POST;
  payload: CreatePostRequest;
}

export interface RequestAddPostSuccessAction {
  type: PostActionTypes.REQUEST_ADD_POST_SUCCESS;
}

export interface RequestAddPostErrorAction {
  type: PostActionTypes.REQUEST_ADD_POST_ERROR;
  payload: IError;
}

export interface SetIsLoadingPost {
  type: PostActionTypes.SET_IS_LOADING_POST;
  payload: boolean;
}

export type PostAction =
  | RequestPostsSuccessAction
  | RequestPostsErrorAction
  | RequestAddPostAction
  | RequestAddPostSuccessAction
  | RequestAddPostErrorAction;
