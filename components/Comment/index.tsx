import React from 'react';
import {Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Stack, Typography} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import styles from "./Comment.module.sass"

const Comment = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={styles.box}>
            <Stack
                direction={"row"}
                spacing={1}
            >
                <Avatar src={"https://leonardo.osnova.io/9a07aef4-a8c3-388d-4661-08bae93feb0e/-/scale_crop/64x64/-/format/webp/"}/>
                <Box>
                    <Typography>{"Bob Smith"}</Typography>
                    <Typography>2 часа</Typography>
                </Box>
            </Stack>
            <Typography>
                -20 сошиал линк. Товарищ Xi Jinping
            </Typography>
            <Stack direction={"row"}>
                <Button className={styles.button} variant={"text"}>Ответить</Button>
                <IconButton>
                    <MoreHorizIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    elevation={2}
                    open={!!anchorEl}
                    onClose={handleClose}
                    keepMounted
                >
                    <MenuItem onClick={handleClose}>Удалить</MenuItem>
                    <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                </Menu>
            </Stack>
            <Divider />
        </Box>
    );
};

export default Comment;