import {SocketState, SocketTypes} from "../types/socket";
import {io} from "socket.io-client";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

const initialState: SocketState = {
    socket: null
}

export const socketReducer = (state = initialState, action: AnyAction): SocketState => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.socket };
        case SocketTypes.SET_SOCKET:
            return {...state, socket: io({query: {userId: action.payload}})}
        default:
            return state
    }
}

export default socketReducer