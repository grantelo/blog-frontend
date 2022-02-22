import {combineReducers} from "redux";
import user from "./user";
import app from "./app";
import post from "./post"

const rootReducer = combineReducers({
    user,
    app,
    post
})

export default rootReducer
