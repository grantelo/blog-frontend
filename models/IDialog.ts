import {IMessage} from "./IMessage";
import {IUser} from "./IUser";

export interface IDialog {
    id: number,
    users: IUser[],
    lastMessage: IMessage,
    messages: IMessage[]
}