import {PostActionTypes, PostState} from "../types/post";
import {AnyAction} from "redux";
import {HYDRATE} from "next-redux-wrapper";

const initialState: PostState = {
    items: [],
    isLoading: false,
    error: null
}

const post = (state: PostState = initialState, action: AnyAction): PostState => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload.post}

        case PostActionTypes.SET_IS_LOADING_POST:
            return {...state, isLoading: action.payload}

        case PostActionTypes.REQUEST_POSTS_SUCCESS:
            return {...state, items: action.payload, error: null, isLoading: false}

        case PostActionTypes.REQUEST_POSTS_ERROR:
            return {...state, error: action.paylaod, isLoading: false}

        case PostActionTypes.REQUEST_ADD_POST_SUCCESS:
            return {...state, isLoading: false}

        case PostActionTypes.REQUEST_ADD_POST_ERROR:
            return {...state, isLoading: false, error: action.payload}

        default:
            return state
    }
}

export default post
