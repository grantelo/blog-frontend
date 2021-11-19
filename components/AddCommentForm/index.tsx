import React from 'react';
import {Box, Button, InputBase} from "@mui/material";

import styles from "./AddCommentForm.module.sass"

const AddCommentForm = () => {
    const [activeButton, setActiveButton] = React.useState<boolean>(false)

    const handleClick = () => {
        setActiveButton(true)
    }

    return (
        <Box className={styles.box}>
            <InputBase
                onClick={handleClick}
                placeholder={"Написать комментарий"}
                fullWidth
                multiline
            />
            {activeButton &&
            <Button
                className={styles.button}
                variant={"contained"}
                color={"primary"}
            >Отправить</Button>}
        </Box>
    );
};

export default AddCommentForm;