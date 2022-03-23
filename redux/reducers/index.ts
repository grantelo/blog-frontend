import {combineReducers} from "redux";
import user from "./user";
import app from "./app";
import post from "./post"
import comment from "./comment"

const rootReducer = combineReducers({
    user,
    app,
    post,
    comment
})

export default rootReducer
