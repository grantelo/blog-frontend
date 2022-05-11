import { AxiosInstance } from "axios";
import { baseURL } from ".";
import { CreateMessageRequest } from "../../models/request/CreateMessageRequest";

const MessageApi = (instance: AxiosInstance) => ({
    send: (dto: CreateMessageRequest) => instance.post(`/message`, dto),
    findAllByDialog: (dialogId: number) => instance.get(`/message?dialogId=${dialogId}`),
    delete: (messageId: number) => instance.delete(`/message/${messageId}`),
})

export default MessageApi