import { Badge, Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import classNames from "classnames"
import format from "date-fns/format"
import isToday from "date-fns/isToday"
import isYesterday from "date-fns/isYesterday"
import Link from "next/link"
import { IMessage } from "../../models/IMessage"
import { IUser } from "../../models/IUser"
import CustomAvatar from "../CustomAvatar"

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        padding: "13px 20px",
        color: "#202020",
        cursor: "pointer",
        fontSize: "14px",
        "& p": {
            fontSize: "inherit"
        },
        "&:hover": {
            backgroundColor: "#F3F7FF"
        }
    },
    selected: {
        backgroundColor: "#F3F7FF"
    },
    avatar: {
        display: "flex",
        alignItems: "center"
    },
    box: {
        marginLeft: "11px"
    },
    name: {
        fontWeight: 600
    },
    lastMessage: {
        whiteSpace: "nowrap",
    },
    dateMessage: {
        position: "absolute",
        top: "7px",
        right: "22px",
        opacity: "0.4"
    },
    badge: {
        position: "absolute",
        bottom: "24px",
        right: "29px",
    },
    link: {
        textDecoration: "none"
    }
}))

const getMessageTime = (date: Date) => {
    if (isToday(new Date(date)) || isYesterday(new Date(date))) {
        return format(new Date(date), "HH:mm")
    }

    return format(new Date(date), "dd.MM.yyyy")
}

interface DialogItemProps {
    id: number,
    users: IUser[],
    lastMessage: IMessage,
    countUnread: number,
    selected: boolean
}

const DialogItem: React.FC<DialogItemProps> = ({id, users, lastMessage, countUnread, selected}) => {
    const classes = useStyle()

    return (
        <Link href={`dialogs/${id}`} passHref shallow>
            <a className={classes.link}>
            <Box className={classNames(classes.root, {[classes.selected]: selected})}>
                <Box className={classes.avatar}>
                    <CustomAvatar avatar={users[0]?.avatar} isOnline={users[0]?.isOnline}/>
                    <Box className={classes.box}>
                        <Typography className={classes.name}>{users[0]?.fullName}</Typography>
                        <Typography className={classes.lastMessage}>
                            {lastMessage.text}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    className={classes.dateMessage}
                    variant={"subtitle2"}
                >
                    {lastMessage && getMessageTime(lastMessage.createdAt)}
                </Typography>
                {
                    countUnread &&
                    <Badge
                        className={classes.badge}
                        badgeContent={countUnread > 9 ? "+9" : countUnread}
                        color={"secondary"}
                    />
                }
            </Box>
            </a>
        </Link>
    );
};

export default DialogItem;