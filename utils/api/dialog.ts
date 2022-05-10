import { AxiosInstance } from "axios";
import { baseURL } from ".";
import { IDialog } from "../../models/IDialog";
import { IUser } from "../../models/IUser";
import { CreateDialogRequest } from "../../models/request/CreateDialogRequest";

const DialogApi = (instance: AxiosInstance) => ({
    create: (usersIds: CreateDialogRequest) => instance.post(`${baseURL}/dialog`),
    findAll: () => instance.get<IDialog[]>(`${baseURL}/dialog`),
    delete: (dialogId: number) => instance.delete(`${baseURL}/dialog/${dialogId}`),
})

export default DialogApi