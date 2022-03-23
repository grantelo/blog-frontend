import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import {CommentActionTypes, CommentState } from "../types/comment";

const initialState: CommentState = {
    items: [],
    isLoading: false,
    error: null
}

const comment = (state: CommentState = initialState, action: AnyAction): CommentState => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload.comment}
        case CommentActionTypes.REQUEST_COMMENTS_SUCCESS:
            return {...state, items: action.payload, isLoading: false, error: null}
        case CommentActionTypes.REQUEST_COMMENTS_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case CommentActionTypes.REQUEST_ADD_COMMENT_SUCCESS:
            return {...state, items: [...state.items, action.payload], isLoading: false}
        case CommentActionTypes.REQUEST_ADD_COMMENT_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case CommentActionTypes.REQUEST_UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                items: state.items.map(comment => comment.id === action.payload.id ? action.payload : comment),
                isLoading: true
            }
        case CommentActionTypes.REQUEST_UPDATE_COMMENT_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case CommentActionTypes.REQUEST_DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                items: state.items.filter(comment => comment.id !== action.payload.id),
                isLoading: true
            }
        case CommentActionTypes.REQUEST_DELETE_COMMENT_ERROR:
            return {...state, error: action.paylaod, isLoading: false}
        case CommentActionTypes.SET_IS_LOADING_COMMENT:
            return {...state, isLoading: action.payload}
        default: return state

    }
}

export default comment
