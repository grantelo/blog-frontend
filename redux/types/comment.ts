import { IComment } from "../../models/IComment";
import IError from "../../models/IError";
import { CreateCommentRequest } from "../../models/request/CreateCommentRequest";
import { UpdateCommentRequest } from "../../models/request/UpdateCommentRequest";

export enum CommentActionTypes {
  SET_IS_LOADING_COMMENT = "SET_IS_LOADING_COMMENT",
  REQUEST_COMMENTS_SUCCESS = "REQUEST_COMMENTS_SUCCESS",
  REQUEST_COMMENTS_ERROR = "REQUEST_COMMENTS_ERROR",
  REQUEST_ADD_COMMENT = "REQUEST_ADD_COMMENT",
  REQUEST_ADD_COMMENT_SUCCESS = "REQUEST_ADD_COMMENT_SUCCESS",
  REQUEST_ADD_COMMENT_ERROR = "REQUEST_ADD_COMMENT_ERROR",
  REQUEST_UPDATE_COMMENT = "REQUEST_UPDATE_COMMENT",
  REQUEST_UPDATE_COMMENT_SUCCESS = "REQUEST_UPDATE_COMMENT_SUCCESS",
  REQUEST_UPDATE_COMMENT_ERROR = "REQUEST_UPDATE_COMMENT_ERROR",
  REQUEST_DELETE_COMMENT = "REQUEST_DELETE_COMMENT",
  REQUEST_DELETE_COMMENT_SUCCESS = "REQUEST_DELETE_COMMENT_SUCCESS",
  REQUEST_DELETE_COMMENT_ERROR = "REQUEST_DELETE_COMMENT_ERROR",
}

export interface CommentState {
  items: IComment[];
  isLoading: boolean;
  error: IError | null;
}

export interface RequestCommentsSuccessAction {
  type: CommentActionTypes.REQUEST_COMMENTS_SUCCESS;
  payload: IComment[];
}

export interface RequestCommentsErrorAction {
  type: CommentActionTypes.REQUEST_COMMENTS_ERROR;
  payload: IError;
}

export interface RequstAddCommentAction {
  type: CommentActionTypes.REQUEST_ADD_COMMENT;
  payload: CreateCommentRequest;
}

export interface RequstAddCommentSuccessAction {
  type: CommentActionTypes.REQUEST_ADD_COMMENT_SUCCESS;
  payload: IComment;
}

export interface RequstAddCommentErrorAction {
  type: CommentActionTypes.REQUEST_ADD_COMMENT_ERROR;
  payload: IError;
}

export interface RequstUpdateCommentAction {
  type: CommentActionTypes.REQUEST_UPDATE_COMMENT;
  payload: {
    id: number;
    dto: UpdateCommentRequest;
  };
}

export interface RequstUpdateCommentSuccessAction {
  type: CommentActionTypes.REQUEST_UPDATE_COMMENT_SUCCESS;
  payload: number;
}

export interface RequstUpdateCommentErrorAction {
  type: CommentActionTypes.REQUEST_UPDATE_COMMENT_ERROR;
  payload: IError;
}

export interface RequstDeleteCommentAction {
  type: CommentActionTypes.REQUEST_DELETE_COMMENT;
  payload: number;
}

export interface RequstDeleteCommentSuccessAction {
  type: CommentActionTypes.REQUEST_DELETE_COMMENT_SUCCESS;
  payload: IComment;
}

export interface RequstDeleteCommentErrorAction {
  type: CommentActionTypes.REQUEST_DELETE_COMMENT_ERROR;
  payload: IError;
}

export interface SetIsLoadingCommentAction {
  type: CommentActionTypes.SET_IS_LOADING_COMMENT;
  payload: boolean;
}

export type CommentAction =
  | RequestCommentsSuccessAction
  | RequestCommentsErrorAction
  | RequstAddCommentAction
  | RequstAddCommentSuccessAction
  | RequstAddCommentErrorAction
  | RequstUpdateCommentAction
  | RequstUpdateCommentSuccessAction
  | RequstUpdateCommentErrorAction
  | RequstDeleteCommentAction
  | RequstDeleteCommentSuccessAction
  | RequstDeleteCommentErrorAction
  | SetIsLoadingCommentAction;
