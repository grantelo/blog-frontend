import { Box } from "@mui/material";
import { FC } from "react";
import { IDialog } from "../../models/IDialog";
import { IUser } from "../../models/IUser";
import DialogItem from "../DialogItem";

interface DialogsProps {
    user: IUser,
    currentDialogId: number,
    dialogs: IDialog[]
}

const Dialogs: FC<DialogsProps> = ({user, currentDialogId, dialogs}) => {
    const handleSelectedDialogItem = (dialogId: string): void => {

    }


    return (
        <Box>
            {dialogs.map((dialogObj: IDialog) => (
                <DialogItem
                    key={dialogObj.id}
                    id={dialogObj.id}
                    users={dialogObj.users.filter(item => item.id !== user.id)}
                    lastMessage={dialogObj.lastMessage}
                    countUnread={dialogObj.countUnread}
                    selected={dialogObj.id === currentDialogId}
                />
            ))}
        </Box>
    );
};

export default Dialogs;