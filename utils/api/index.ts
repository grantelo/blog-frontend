import axios from "axios";
import nookies  from "nookies";
import setCookie from 'set-cookie-parser'
import { GetServerSidePropsContext, NextPageContext } from "next";
import UserApi from "./user";
import PostApi from "./post";
import CommentApi from "./comment";
import AuthResponse from "../../models/response/AuthResponse";
import FileApi from "./file";
import DialogApi from "./dialog";
import MessageApi from "./message";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
  file: ReturnType<typeof FileApi>;
  dialog: ReturnType<typeof DialogApi>,
  message: ReturnType<typeof MessageApi>
};

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? nookies.get(ctx) : nookies.get();
  const responseAccessToken = setCookie.parse(ctx?.res?.getHeader('Set-Cookie') as string[], {map: true})?.accessToken?.value
  const accessToken = responseAccessToken ?? cookies.accessToken;

  console.log("testing cookies")
  // console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  // console.log(cookies);

  //console.log(accessToken)

  const instance = axios.create({
    withCredentials: true,
    baseURL,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  // instance.interceptors.request.use(config => {
  //     if (typeof window === "undefined") return config
  //
  //     config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  //     return config
  // })

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log(error)
      if (error.response.status === 401 && !error?.config._isRetry) {
        originalRequest._isRetry = true;
        const response = await axios.get<AuthResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            withCredentials: true,
            headers: {
              Cookie: `refreshToken=${cookies.refreshToken}`,
            },
          }
        );
        console.log("response for refresh")
        console.log(response);
        nookies.set(ctx ?? null, "accessToken", response.data.accessToken, {
          maxAge: 1000 * 60 * 15,
        });
        nookies.set(ctx ?? null, "refreshToken", response.data.refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        console.log("context after refresh:")
        console.log(ctx)
        originalRequest.headers.Authorization =
          "Bearer " + response.data.accessToken;
        return instance.request(originalRequest);
      }

      // if (error.response.status === 401) {
      //     store.dispatch(requestUserLogoutAction())
      // }

      throw error.config;
    }
  );

  const apis = {
    user: UserApi,
    post: PostApi,
    comment: CommentApi,
    file: FileApi,
    dialog: DialogApi,
    message: MessageApi
  };

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);
};

export default Api;
