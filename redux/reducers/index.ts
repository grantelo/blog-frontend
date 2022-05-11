import {combineReducers} from "redux";
import user from "./user";
import app from "./app";
import post from "./post"
import comment from "./comment"
import dialog from "./dialog"
import message from "./message"
import socket from "./socket"

const rootReducer = combineReducers({
    user,
    app,
    post,
    comment,
    message,
    dialog,
    socket
})

export default rootReducer
