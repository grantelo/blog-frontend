import React from 'react';
import {IconButton, InputBase, Paper, Stack} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from "./InputSearch.module.sass"

const InputSearch = () => {
    return (
        <Paper style={{backgroundColor: "red"}} className={styles.root}>
            <Stack direction={"row"}>
                <InputBase/>
                <IconButton
                    type="submit"
                    sx={{ p: '10px' }}
                    aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Stack>
        </Paper>
    );
};

export default InputSearch;