import { useState } from "react";
import Image from "next/image";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import classNames from "classnames";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Time from "../Time";
import readSvg from "../../public/static/img/read.svg";
import unreadSvg from "../../public/static/img/unread.svg";
import { RequestDeleteMessageAction } from "../../redux/types/message";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  rootIsME: {
    alignItems: "flex-end",
  },
  box: {
    position: "relative",
    display: "flex",
    marginBottom: "8px",
    alignItems: "center",
  },
  avatar: {},
  message: {
    marginLeft: "13px",
    maxWidth: "400px",
    background: "#3674FF",
    padding: "15px",
    fontSize: "14px",
    borderRadius: "12px 12px 12px 0px",
    color: "#fff",
    letterSpacing: "1px",
    boxShadow: "0px 5px 5px rgba(54, 116, 255, 0.196733)",
  },
  messageIsMe: {
    border: "1px solid #ECECEC",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.0220444)",
    borderRadius: "12px 12px 0px 12px",
    marginLeft: 0,
    marginRight: "13px",
    order: -1,
    background: "#fff",
    color: "#202020  ",
  },
  visitDate: {
    paddingLeft: "56px",
    opacity: 0.4,
    fontSize: "12px",
  },
  visitDateIsMe: {
    paddingLeft: 0,
    paddingRight: "56px",
  },
  icon: {
    position: "absolute",
    bottom: "-15px",
    left: "-20px",
  },
  iconButton: {
    position: "absolute",
    left: "-48px",
    opacity: 0.5,
  },
  attachments: {
    display: "flex",
    alignItems: "center",
    order: -1,
  },
  list: {
    display: "flex",
    marginRight: "10px",
  },
}));

interface MessageProps {
  id?: number;
  text?: string;
  date?: Date;
  isMe: boolean;
  read?: boolean;
  isTyping?: boolean;
  avatar: string;
  handleDeleteMessage?: (messageId: number) => RequestDeleteMessageAction;
}

const Message: React.FC<MessageProps> = ({
  id,
  text,
  date,
  isMe,
  read,
  isTyping,
  avatar,
  handleDeleteMessage,
}) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteMessage = () => {
    handleClose();
    handleDeleteMessage!(id!);
  };

  console.log(isMe);

  return (
    <Box className={classNames(classes.root, { [classes.rootIsME]: isMe })}>
      <Box className={classes.box}>
        <Avatar className={classes.avatar} src={avatar} />
        {(text || isTyping) && (
          <Typography
            className={classNames(classes.message, {
              [classes.messageIsMe]: isMe,
            })}
          >
            {text ?? "????????????????..."}
          </Typography>
        )}
        {isMe && (
          <Box sx={{ position: "absolute", bottom: "-15px", left: "-20px" }}>
            {read ? <Image src={readSvg} /> : <Image src={unreadSvg} />}
          </Box>
        )}
        {isMe && (
          <>
            <IconButton className={classes.iconButton} onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={onDeleteMessage}>?????????????? ??????????????????</MenuItem>
            </Menu>
          </>
        )}
      </Box>
      <Typography
        className={classNames(classes.visitDate, {
          [classes.visitDateIsMe]: isMe,
        })}
      >
        {date && <Time date={date} />}
      </Typography>
    </Box>
  );
};

export default Message;
