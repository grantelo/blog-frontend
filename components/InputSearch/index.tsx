import React from 'react';
import {IconButton, InputBase, Paper, Stack} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from "./InputSearch.module.sass"

const InputSearch = () => {
    return (
        <Paper
            elevation={0}
            className={styles.root}
        >
            <SearchIcon/>
            <InputBase
                placeholder={"Поиск"}
                classes={{root: styles.inputBase}}
            />
        </Paper>
    );
};

export default InputSearch;