import {combineReducers} from "redux";
import {store} from "next/dist/build/output/store";
import user from "./user";

const rootReducer = combineReducers({
    user
})

export default rootReducer