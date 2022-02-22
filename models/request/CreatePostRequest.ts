import {OutputData} from "@editorjs/editorjs";

export interface CreatePostRequest {
    title: string,
    body: OutputData["blocks"],
    tags: string
}
