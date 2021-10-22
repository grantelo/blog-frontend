import React from 'react';
import {Container, Divider, Paper, Tab, Tabs, Typography} from "@mui/material";
import AddCommentForm from "../AddCommentForm"

import styles from "./PostComments.module.sass"
import Comment from "../Comment";
import {Box} from "@mui/system";

const PostComments = () => {
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Paper className={styles.paper}>
                <Box className={styles.container}>
                    <Typography
                        className={styles.title}
                        variant={"h6"}
                    >42 комментария</Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="Популярные"/>
                        <Tab label="По порядку"/>
                    </Tabs>
                    <Divider/>
                    <AddCommentForm/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </Box>
            </Paper>
        </>
    );
};

export default PostComments;