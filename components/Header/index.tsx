import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {Container, InputBase, Paper, Stack} from '@mui/material';
import logo from "../../public/static/img/logo.svg"
import InputSearch from

import styles from "./Header.module.sass"


const Header = () => {
    return (
        <Paper className={styles.paper}>
            <Container>
                <Stack direction={"row"}>
                    <Link href={"/"}>
                        <a>
                            <Image
                                src={logo}
                                width={40}
                                height={40}
                            />
                        </a>
                    </Link>
                    <InputSearch/>
                </Stack>
            </Container>
        </Paper>
    );
};

export default Header;