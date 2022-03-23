import { AxiosInstance } from "axios";
import { IComment } from "../../models/IComment";
import { CreateCommentRequest } from "../../models/request/CreateCommentRequest";
import { UpdateCommentRequest } from "../../models/request/UpdateCommentRequest";

const CommentApi = (instance: AxiosInstance) => ({
    getAll: (postId: number) => instance.get<IComment[]>("/comment", {params: {postId}}),
    create: (dto: CreateCommentRequest) => instance.post<IComment>("/comment", dto),
    delete: (commentId: number) => instance.delete<IComment>(`/comment/${commentId}`),
    update: (commentId: number, dto: UpdateCommentRequest) => instance.patch<IComment>(`/comment/${commentId}`, dto)
})

export default CommentApi
