import {SetSocketAction, SocketTypes} from "../types/socket";

export const setSocket = (payload: number): SetSocketAction => ({
    type: SocketTypes.SET_SOCKET,
    payload
})