import {IUser} from "./IUser";
import {OutputData} from "@editorjs/editorjs";

export interface IPost {
    id: number,
    user: IUser,
    title: string,
    body: OutputData["blocks"],
    views: number,
    tags: string,
    createdAt: Date,
    updatedAt: Date
}
