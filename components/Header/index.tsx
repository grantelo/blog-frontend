import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {Avatar, Box, IconButton, Paper, Stack, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import logo from "../../public/static/img/logo.svg"
import InputSearch from "../InputSearch";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import styles from "./Header.module.sass"
import AuthDialog from '../AuthDialog';
import * as _ from "lodash";
import useTypedSelector from "../../hooks/useTypedSelector";


const Header = () => {
    const [visibleAuthDialog, setVisibleAuthDialog] = React.useState<boolean>(false)
    const userData = useTypedSelector(({user}) => user)

    const handleCloseAuthDialog = () => {
        setVisibleAuthDialog(false)
    }

    const handleOpenAuthDialog = () => {
        setVisibleAuthDialog(true)
    }


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
                    <Link href={"/write"}>
                        <a>
                            <Button
                                className={styles.button}
                                variant={"contained"}
                            >Новая запись</Button>
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
                    {
                        userData.isAuth ? <Avatar src={userData.user.avatar}/>
                            :
                            <Box
                                className={styles.loginButton}
                                onClick={handleOpenAuthDialog}
                            >
                                <AccountCircleOutlinedIcon/>
                                <Typography>Войти</Typography>
                            </Box>
                    }
                </Stack>
            </Stack>
            <AuthDialog
                open={visibleAuthDialog}
                handleClose={handleCloseAuthDialog}
            />
        </Paper>
    );
};

export default Header;
