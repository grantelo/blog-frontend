import { IDialog } from "./IDialog";
import { IUser } from "./IUser";

export interface IMessage {
    id: number;
    text: string;
    dialog: IDialog;
    user: IUser;
    read: boolean;
    createdAt: Date;
    updateAt: Date
}