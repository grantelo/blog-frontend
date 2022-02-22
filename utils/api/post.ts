import axios, {AxiosInstance} from "axios";
import LoginRequest from "../../models/request/LoginRequest";
import AuthResponse from "../../models/response/AuthResponse"
import RegistrationRequest from "../../models/request/RegistrationRequest";
import {OutputBlockData} from "@editorjs/editorjs/types/data-formats/output-data";
import {CreatePostRequest} from "../../models/request/CreatePostRequest";
import {IPost} from "../../models/IPost";

const baseURL = "http://localhost:5000"

const PostApi = (instance: AxiosInstance) =>  ({
    create: (dto: CreatePostRequest) => instance.post<IPost>(`/posts`, dto),
    getOne: (id: number) => instance.get<IPost>(`/posts/${id}`)
})

export default PostApi
