import React from 'react';
import dynamic from "next/dynamic";
import {Box, Button, InputBase} from "@mui/material";

import styles from "./WriteForm.module.sass"


const Editor = dynamic(
    () => import("../Editor"),
    {ssr: false}
)

const WriteForm = () => {
    return (
        <Box className={styles.box}>
            <InputBase />
            <Box>
                <Editor />
            </Box>
            <Button variant={"contained"} color={"primary"}>Опубликовать</Button>
        </Box>
    );
};

export default WriteForm;