import { Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import classNames from "classnames";
import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import {Socket} from "socket.io-client"
import SendIcon from "@mui/icons-material/Send";
import CustomInput from "../CustomInput";

const useStyle = makeStyles(theme => ({
    form: {
        position: "relative",
        display: "flex",
        alignItems: "center"
    },
    iconBox: {
        display: "flex"
    },
    sendIconButton: {
        left: "-50%"
    },
    icon: {
        transition: "all 0.5s",
        opacity: "1"
    },
    hiddenIcon: {
        opacity: "0",
        zIndex: -1
    },
    img: {
        width: "16px",
        height: "16px",
        marginRight: "2px",
        pointerEvents: "none"
    },
    input: {
        display: "none"
    },
    attachments: {
        display: "flex",
        alignItems: "center"
    }
}))

interface FormSendMessageProps {
    fetchSendMessage: (text: string, attachments?: string[]) => AppThunk<MessageActions | DialogActions>
    refDiv: React.RefObject<HTMLDivElement>;
    socket: Socket | null,
    //setAlert: ({text, severity}: SetAlertPayload) => void
}

const FormSendMessage: FC<FormSendMessageProps> = ({fetchSendMessage, refDiv, socket, setAlert}) => {
    const classes = useStyle()
    const [value, setValue] = useState<string>("")
    const [isRecord, setIsRecord] = useState<boolean>(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const [attachments, setAttachments] = useState<File[]>([])
    const emojiRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const refInputFile: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    let range: Range = new Range();

    const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault()

        fetchSendMessage(value);

        refDiv.current!.innerText = ""
    }

    const handleInput = (e: ChangeEvent<HTMLDivElement>): void => {
        setValue(refDiv.current!.innerHTML)
        socket?.emit("dialog:typing")
    }

    // const handleClickEmoji = (emoji: BaseEmoji): void => {
    //     const img = document.createElement("img")
    //     img.setAttribute("src", `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-64/${emoji.unified}.png`)
    //     img.setAttribute("alt", emoji.colons)
    //     img.classList.add(classes.img)

    //     if(document.getSelection()?.anchorNode === refDiv.current!) {
    //         range!.setStart(refDiv.current!, document.getSelection()?.focusOffset!)
    //     }
    //     else {
    //         const lastChild = refDiv.current?.lastChild
    //         lastChild ? range.setStartAfter(lastChild!) : range.setStart(refDiv.current!, 0)
    //     }

    //     document.getSelection()?.removeAllRanges()
    //     document.getSelection()?.addRange(range)

    //     range.insertNode(img)
    //     range.setStartAfter(img)

    //     setValue(refDiv.current!.innerHTML!)
    // }

    return (
        <>
            {/* <Attachments
                urls={urls}
                handleRemoveFileCard={handleRemoveFileCard}
            /> */}
            <form
                className={classes.form}
                onSubmit={handleSubmit}
            >
                {/* <EmojiPicker emojiRef={emojiRef} handleClickEmoji={handleClickEmoji}/> */}
                <CustomInput
                    refDiv={refDiv}
                    handleInput={handleInput}
                />
                <Box className={classes.iconBox}>
                    <IconButton
                        className={classNames([classes.icon, classes.sendIconButton], {[classes.hiddenIcon]: !value && !attachments.length})}
                        type={"submit"}
                    >
                        <SendIcon fontSize={"large"}/>
                    </IconButton>
                </Box>
            </form>
        </>
    );
};

export default FormSendMessage;