import React from 'react';
import {Box, Button, InputBase} from "@mui/material";

import styles from "./AddCommentForm.module.sass"

const AddCommentForm = () => {
    return (
        <Box className={styles.box}>
            <InputBase placeholder={"Написать комментарий"} fullWidth multiline/>
            <Button variant={"contained"} color={"primary"}>Отправить</Button>
        </Box>
    );
};

export default AddCommentForm;