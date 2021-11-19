import React from 'react';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import List from "./List";
import {IconButton} from "@mui/material";

const items = [
    <ModeCommentRoundedIcon />,
    <RepeatOutlinedIcon />,
    <BookmarkBorderOutlinedIcon />,
    <ShareIcon />
]

const PostActions = () => {
    return (
        <List
            items={items}
            renderItem={(item, i) => <IconButton key={i} color={"primary"}>{item}</IconButton>}
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
        />
    );
};

export default PostActions;