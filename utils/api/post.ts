import { AxiosInstance } from "axios";
import { CreatePostRequest } from "../../models/request/CreatePostRequest";
import { IPost } from "../../models/IPost";
import { SearchPostsResponse } from "../../models/response/SearchPostsResponse";

const PostApi = (instance: AxiosInstance) => ({
  getAll: () => instance.get<IPost[]>("/posts"),
  create: (dto: CreatePostRequest) => instance.post<IPost>(`/posts`, dto),
  getOne: (id: number) => instance.get<IPost>(`/posts/${id}`),
  search: (query: string) =>
    instance.get<SearchPostsResponse>("/posts/search", { params: { query } }),
});

export default PostApi;
