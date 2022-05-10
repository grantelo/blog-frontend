import { AxiosInstance } from "axios";
import { baseURL } from ".";
import { CreateMessageRequest } from "../../models/request/CreateMessageRequest";

const MessageApi = (instance: AxiosInstance) => ({
    send: (dto: CreateMessageRequest) => instance.post(`${baseURL}/messasge`, dto),
    findAllByDialog: (dialogId: number) => instance.get(`${baseURL}/message?dialogId=${dialogId}`),
    delete: (messageId: number) => instance.delete(`${baseURL}/message/${messageId}`),
})

export default MessageApi