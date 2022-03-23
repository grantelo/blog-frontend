import axios from "axios";
import nookies from "nookies";
import {GetServerSideProps, GetServerSidePropsContext, NextPageContext} from "next";
import UserApi from "./user";
import PostApi from "./post";
import CommentApi from "./comment";
import AuthResponse from "../../models/response/AuthResponse";
import {requestUserLogoutAction} from "../../redux/actions/user";
import {store} from "../../redux/store";
import {json} from "stream/consumers";

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>,
    post: ReturnType<typeof PostApi>
    comment: ReturnType<typeof CommentApi>
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? nookies.get(ctx) : nookies.get()
    const accessToken = cookies.accessToken

    //console.log(accessToken)

    const instance = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:5000/",
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })

    // instance.interceptors.request.use(config => {
    //     if (typeof window === "undefined") return config
    //
    //     config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    //     return config
    // })

    instance.interceptors.response.use(config => {
        return config
    }, async error => {
        const originalRequest = error.config

        if (error.response.status === 401 && !error?.config._isRetry) {
            originalRequest._isRetry = true
            const response = await axios.get<AuthResponse>(
                "http://localhost:5000/auth/refresh",
                {
                    withCredentials: true,
                    headers: {
                        Cookie: `refreshToken=${cookies.refreshToken}`
                    }
                })
            nookies.set(ctx ?? null, "accessToken", response.data.accessToken, {maxAge: 1000 * 60 * 15})
            originalRequest.headers.Authorization = 'Bearer ' + response.data.accessToken
            return instance.request(originalRequest)
        }

        // if (error.response.status === 401) {
        //     store.dispatch(requestUserLogoutAction())
        // }

        throw error.config
    })

    const apis = {
        user: UserApi,
        post: PostApi,
        comment: CommentApi
    };

    return Object.entries(apis).reduce((prev, [key, f]) => {
        return {
            ...prev,
            [key]: f(instance),
        };
    }, {} as ApiReturnType)
}

export default Api

