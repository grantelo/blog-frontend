import React from 'react';
import Link from 'next/link';
import {Box, Button, SvgIcon} from "@mui/material";
import {useRouter} from "next/router";

import styles from "./LeftMenuItem.module.sass"

interface LeftMenuItemProps {
    text: string,
    path: string,
    icon: typeof SvgIcon
}

const LeftMenuItem: React.FC<LeftMenuItemProps> =
    ({text, icon, path}) => {
        const router = useRouter()

        return (
            <Box className={styles.box}>
                <Link href={path}>
                    <a>
                        <Button className={styles.button} variant={router.asPath === path ? "contained" : "text"}>
                            {icon}
                            {text}
                        </Button>
                    </a>
                </Link>
            </Box>
        );
    };

export default LeftMenuItem;