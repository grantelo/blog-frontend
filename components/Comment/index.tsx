import React, { FC } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { formatDistanceToNow } from "date-fns";
import ru from "date-fns/locale/ru";

import styles from "./Comment.module.sass";
import useTypedSelector from "../../hooks/useTypedSelector";
import EditCommentForm from "../EditCommentForm";

interface CommentProps {
  id: number;
  authorId: number;
  text: string;
  fullName: string;
  avatar: string;
  updatedAt: string;
  isLoading: boolean;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, text: string) => void;
}

const Comment: FC<CommentProps> = ({
  id,
  authorId,
  text,
  fullName,
  avatar,
  updatedAt,
  isLoading,
  handleDelete,
  handleEdit,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [visibleEditComment, setVisibleEditComment] =
    React.useState<boolean>(false);
  const userId = useTypedSelector(({ user }) => user.user.id);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    handleDelete(id);
  };

  const onEdit = (text: string) => {
    handleEdit(id, text);
  };

  const toggleVisibleEditComment = () => {
    setVisibleEditComment((visible) => !visible);
  };

  return (
    <Box className={styles.box}>
      <Stack direction={"row"} spacing={1}>
        <Avatar src={avatar} />
        <Box>
          <Typography>{fullName}</Typography>
          <Typography>
            {formatDistanceToNow(new Date(updatedAt), { locale: ru })}
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/*<Button className={styles.button} variant={"text"}>Ответить</Button>*/}
        <Typography>{text}</Typography>
        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          elevation={2}
          open={!!anchorEl}
          onClose={handleClose}
          keepMounted
        >
          {userId === authorId && (
            <MenuItem onClick={toggleVisibleEditComment}>
              Редактировать
            </MenuItem>
          )}
          <MenuItem onClick={onDelete}>Удалить</MenuItem>
        </Menu>
      </Stack>
      <Divider />
      {visibleEditComment && (
        <EditCommentForm
          initialText={text}
          onEditComment={onEdit}
          isSubmiting={isLoading}
          handleClose={toggleVisibleEditComment}
        />
      )}
    </Box>
  );
};

export default Comment;
