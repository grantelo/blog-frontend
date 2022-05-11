import {IMessage} from "./IMessage";
import {IUser} from "./IUser";

export interface IDialog {
    countUnread: number;
    id: number,
    users: IUser[],
    lastMessage: IMessage,
    messages: IMessage[]
}