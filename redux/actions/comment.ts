import { IComment } from "../../models/IComment";
import IError from "../../models/IError";
import { CreateCommentRequest } from "../../models/request/CreateCommentRequest";
import { UpdateCommentRequest } from "../../models/request/UpdateCommentRequest";
import {
  CommentActionTypes,
  RequestCommentsErrorAction,
  RequestCommentsSuccessAction,
  RequstAddCommentAction,
  RequstAddCommentErrorAction,
  RequstAddCommentSuccessAction,
  RequstDeleteCommentAction,
  RequstDeleteCommentErrorAction,
  RequstDeleteCommentSuccessAction,
  RequstUpdateCommentAction,
  RequstUpdateCommentErrorAction,
  RequstUpdateCommentSuccessAction,
  SetIsLoadingCommentAction,
} from "../types/comment";

export const requestCommentsSuccessAction = (
  payload: IComment[]
): RequestCommentsSuccessAction => ({
  type: CommentActionTypes.REQUEST_COMMENTS_SUCCESS,
  payload,
});

export const requestCommentsErrorAction = (
  payload: IError
): RequestCommentsErrorAction => ({
  type: CommentActionTypes.REQUEST_COMMENTS_ERROR,
  payload,
});

export const requestAddCommentAction = (
  payload: CreateCommentRequest
): RequstAddCommentAction => ({
  type: CommentActionTypes.REQUEST_ADD_COMMENT,
  payload,
});

export const requestAddCommentSuccessAction = (
  payload: IComment
): RequstAddCommentSuccessAction => ({
  type: CommentActionTypes.REQUEST_ADD_COMMENT_SUCCESS,
  payload,
});

export const requestAddCommentErrorAction = (
  payload: IError
): RequstAddCommentErrorAction => ({
  type: CommentActionTypes.REQUEST_ADD_COMMENT_ERROR,
  payload,
});

export const requestUpdateCommentAction = (payload: {
  id: number;
  dto: UpdateCommentRequest;
}): RequstUpdateCommentAction => ({
  type: CommentActionTypes.REQUEST_UPDATE_COMMENT,
  payload,
});

export const requestUpdateCommentSuccessAction = (
  payload: IComment
): RequstUpdateCommentSuccessAction => ({
  type: CommentActionTypes.REQUEST_UPDATE_COMMENT_SUCCESS,
  payload,
});

export const requestUpdateCommentErrorAction = (
  payload: IError
): RequstUpdateCommentErrorAction => ({
  type: CommentActionTypes.REQUEST_UPDATE_COMMENT_ERROR,
  payload,
});

export const requestDeleteCommentAction = (
  payload: number
): RequstDeleteCommentAction => ({
  type: CommentActionTypes.REQUEST_DELETE_COMMENT,
  payload,
});

export const requestDeleteCommentSuccessAction = (
  payload: number
): RequstDeleteCommentSuccessAction => ({
  type: CommentActionTypes.REQUEST_DELETE_COMMENT_SUCCESS,
  payload,
});

export const requestDeleteCommentErrorAction = (
  payload: IError
): RequstDeleteCommentErrorAction => ({
  type: CommentActionTypes.REQUEST_DELETE_COMMENT_ERROR,
  payload,
});

export const setIsLoadingCommentAction = (
  payload: boolean
): SetIsLoadingCommentAction => ({
  type: CommentActionTypes.SET_IS_LOADING_COMMENT,
  payload,
});
