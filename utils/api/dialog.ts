import { AxiosInstance } from "axios";
import { baseURL } from ".";
import { IUser } from "../../models/IUser";

const DialogApi = (instance: AxiosInstance) => ({
    create: (usersIds: number[]) => instance.post(`${baseURL}/dialog`),
    findAll: () => instance.get(`${baseURL}/dialog`),
    delete: (dialogId: number) => instance.delete(`${baseURL}/dialog/${dialogId}`),
})

export default DialogApi