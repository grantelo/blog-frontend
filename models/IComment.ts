import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IComment {
    id: number,
    text: string,
    user: IUser,
    post: IPost,
    updatedAt: string
}
