import {combineReducers} from "redux";
import user from "./user";
import app from "./app";
import post from "./post"
import comment from "./comment"
import dialog from "./dialog"
import message from "./message"

const rootReducer = combineReducers({
    user,
    app,
    post,
    comment,
    message,
    dialog
})

export default rootReducer
