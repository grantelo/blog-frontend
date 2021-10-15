import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {Box, Button, Container, IconButton, InputBase, Paper, Stack, Typography} from '@mui/material';
import logo from "../../public/static/img/logo.svg"
import InputSearch from "../InputSearch";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import styles from "./Header.module.sass"


const Header = () => {
    return (
        <Paper className={styles.paper}>
            <Stack
                direction={"row"}
                justifyContent="space-between"
                alignItems="center"
            >
                <Stack
                    direction={"row"}
                    spacing={3}
                    alignItems="center"
                >
                    <Link href={"/"}>
                        <a>
                            <Image
                                src={logo}
                                width={32}
                                height={50}
                            />
                        </a>
                    </Link>
                    <InputSearch/>
                    <Link href={"write"}>
                        <a>
                            <Button className={styles.button} variant={"contained"}>Новая запись</Button>
                        </a>
                    </Link>
                </Stack>
                <Stack direction={"row"}>
                    <IconButton>
                        <SmsOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlinedIcon/>
                    </IconButton>
                    <Box className={styles.loginButton}>
                        <AccountCircleOutlinedIcon/>
                        <Typography>Войти</Typography>
                    </Box>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default Header;