import axios from "axios";
import {store} from "../redux/store"
import {requestUserLogoutAction} from "../redux/actions/user";
import nookies from "nookies";
import AuthResponse from "../models/response/AuthResponse";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/",
})

instance.interceptors.request.use(config => {
    if (typeof window === "undefined") return config

    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
})

instance.interceptors.response.use(config => {
    return config
}, async error => {

    const originalRequest = error.config

    if (error.response.status === 401 && !error?.config._isRetry) {
        originalRequest._isRetry = true
        const response = await axios.get<AuthResponse>("http://localhost:5000/auth/refresh", {withCredentials: true})
        nookies.set(null, "accessToken", response.data.accessToken)
        return instance.request(originalRequest)
    }

    if (error.response.status === 401) {
        store.dispatch(requestUserLogoutAction())
    }

    throw error.config
})

export default instance