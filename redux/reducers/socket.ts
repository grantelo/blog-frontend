import { AnyAction } from "redux";
import {io} from "socket.io-client";
import {SocketState, SocketTypes} from "../types/socket";

const initialState: SocketState = {
    socket: null
}

const socketReducer = (state = initialState, action: AnyAction): SocketState => {
    switch (action.type) {
        case SocketTypes.SET_SOCKET:
            return {...state, socket: io(process.env.NEXT_PUBLIC_API_URL!, {query: {userId: action.payload}})}
        default:
            return state
    }
}

export default socketReducer