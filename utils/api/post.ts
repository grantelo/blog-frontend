import { AxiosInstance } from "axios";
import { CreatePostRequest } from "../../models/request/CreatePostRequest";
import { IPost } from "../../models/IPost";

const PostApi = (instance: AxiosInstance) => ({
  getAll: () => instance.get<IPost[]>("/posts"),
  create: (dto: CreatePostRequest) => instance.post<IPost>(`/posts`, dto),
  getOne: (id: number) => instance.get<IPost>(`/posts/${id}`),
});

export default PostApi;
