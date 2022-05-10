import { FC, useEffect, useRef, useState } from "react";
import { bindActionCreators } from "redux";
import { Box, Container, makeStyles, Typography } from "@mui/material";
import {Socket} from "socket.io-client";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IDialog } from "../../models/IDialog";
import { IUser } from "../../models/IUser";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IMessage } from "../../models/IMessage";
import classNames from "classnames";
import Messages from "../Messages";
import FormSendMessage from "../FormSendMessage";
import Status from "../Status";
import * as MessageActionCreators from "../../redux/actions/message"
import * as DialogActionCreators from "../../redux/actions/dialog"
import { useDispatch } from "react-redux";



const useStyle = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "37px",
        boxSizing: "border-box"
    },
    messagesBox: {
        //padding: "29px 0 37px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden"
    },
    textField: {
        marginRight: "5px"
    },
    personAddIcon: {
        fontSize: "7rem"
    },
    text: {
        fontSize: "20px"
    },
    emptyDialog: {
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        display: "flex"
    },
    contanier: {
        overflowY: "hidden",
        height: "100%"
    }
}))

interface DialogProps {
    user: IUser,
    currentDialog: IDialog,
    socket: Socket | null,
}

const Dialog: FC<DialogProps> = ({user, currentDialog, socket}) => {
    const classes = useStyle()
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {
        requestDeleteDialog,
        setReadedStatusLastMessage,
        addMessage,
        setIsOnline,
        requestMessages,
        requestSendMessage,
        requestDeleteMessage,
        setReadedStatusLastMessages,
    } = bindActionCreators(Object.assign({}, DialogActionCreators, MessageActionCreators), dispatch)
    
    // const {
    //     setAlertDialog,
    //     setIsOnline,
    //     setAlert
    // } = useActions()
    const isLoading: boolean = useTypedSelector<boolean>(({message}) => message.isLoading)
    const items: IMessage[] = useTypedSelector<IMessage[]>(({message}) => message.items)
    let typingTimeoutId: number | null = null
    const partner = currentDialog.users.find(item => item.id !== user.id)!
    const refDiv: React.RefObject<HTMLDivElement> = useRef(null)

    useEffect(() => {
        socket?.on("dialog:typing", toggleIsTyping)
        socket?.on("user:online", (userId: number) => {
            console.log("onLine")
            setIsOnline(userId, true)
        })
        socket?.on("user:disconnected", (userId: number) => {
            setIsOnline(userId, false)
        })
    }, [])

    useEffect(() => {
        if (currentDialog?.id)
            requestMessages()

        socket?.on("message:created", handleAddMessage)
        socket?.on("messages:readed", (dialogId: number, userId: number) => {
            if (userId === user.id) return

            setReadedStatusLastMessage(dialogId)
            setReadedStatusLastMessages(dialogId)
        })
        socket?.on("message:readed", (dialogId: number) => {
            setReadedStatusLastMessages(dialogId)
        })

        return () => {
            socket?.off("message:created")
            socket?.off("messages:readed")
            socket?.off("message:readed")
        }
    }, [currentDialog?.id])

    const handleAddMessage = (message: IMessage) => {
        if (message.user.id === user.id) return

        if (message.dialog.id === currentDialog?.id) {
            addMessage(message)

            if (message.user.id !== user.id)
                socket?.emit("message:read", currentDialog.id)
        }
    }

    // const handleDeleteMessage = (messageId: string): void => {
    //     setAlertDialog({
    //         ...getTypeAlertDialog(ALERT_DIALOG_DELETE_MESSAGE),
    //         handleAgree: fetchDeleteMessage,
    //         data: messageId
    //     })
    // }

    const toggleIsTyping = () => {
        setIsTyping(true)
        if (typeof typingTimeoutId === "number") {
            clearTimeout(typingTimeoutId)
        }

        typingTimeoutId = window.setTimeout(() => {
            setIsTyping(false)
        }, 2000)
    }

    return (
        <Box className={classes.root}>
            <Status
                name={partner.fullName}
                isOnline={partner.isOnline}
                handleDeleteDialog={requestDeleteDialog}
                currentDialog={currentDialog}
            />
            <Container className={classes.contanier}>
                <Box className={classNames(classes.messagesBox, {[classes.emptyDialog]: !currentDialog})}>
                    {!isLoading && (!currentDialog?.id ? (
                            <>
                                <PersonAddIcon
                                    className={classes.personAddIcon}
                                    color={"primary"}
                                />
                                <Typography

                                    variant={"h4"}
                                >
                                    Выберите диалог, чтобы начать общение
                                </Typography>
                            </>
                        )
                        :
                        (<>
                            <Messages
                                user={user}
                                items={items}
                                isTyping={isTyping}
                                handleDeleteMessage={requestDeleteMessage}
                            />
                            <FormSendMessage
                                handleSendMessage={requestSendMessage}
                                refDiv={refDiv}
                                socket={socket}
                                //setAlert={setAlert}
                            />
                        </>))
                    }
                </Box>
            </Container>
        </Box>
    );
};

export default Dialog;
