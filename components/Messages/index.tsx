import { Box, Container, makeStyles } from "@mui/material";
import { FC } from "react";
import { IMessage } from "../../models/IMessage";
import { IUser } from "../../models/IUser";
import { RequestDeleteMessageAction } from "../../redux/types/message";
import Message from "../Message";

const useStyle = makeStyles(() => ({
    root: {
        height: "100%",
        padding: "29px 35px 37px 35px",
        overflowY: "auto"
    },
    messages: {
        marginBottom: "30px"
    }
}))

interface MessagesProps {
    user: IUser,
    items: IMessage[],
    isTyping?: boolean,
    handleDeleteMessage: (messageId: number) => RequestDeleteMessageAction
}

const Messages: FC<MessagesProps> = ({user, items, isTyping, handleDeleteMessage}) => {
    const classes = useStyle()

    return (
        <Box sx={{height: "100%",
        padding: "29px 35px 37px 35px",
        overflowY: "auto"}}>
            <Container>
                <Box className={classes.messages}>
                    {items?.map((messageObj: IMessage) => (
                        <Message
                            key={messageObj.id}
                            id={messageObj.id}
                            isMe={user.id === messageObj.user.id}
                            text={messageObj.text}
                            date={messageObj.createdAt}
                            read={messageObj.read}
                            avatar={messageObj.user.avatar}
                            handleDeleteMessage={handleDeleteMessage}
                            // attachments={messageObj.attachments}
                        />
                    ))}
                    {isTyping && <Message
                        isTyping={isTyping}
                        isMe={false}
                        avatar={user.avatar}
                    />}
                </Box>
            </Container>
        </Box>

    );
};

export default Messages;