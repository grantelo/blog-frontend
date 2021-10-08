import React from 'react';
import Link from 'next/link';
import {Button, SvgIcon} from "@mui/material";
import {useRouter} from "next/router";

interface LeftMenuItem {
    text: string,
    path: string,
    icon: typeof SvgIcon
}

const LeftMenuItem: React.FC<LeftMenuItem> =
    ({text, icon, path}) => {
    const router = useRouter()

    return (
        <Link href={path}>
            <a>
                <Button variant={router.asPath === path ? "contained" : "text"}>
                    {icon}
                    {text}
                </Button>
            </a>
        </Link>
    );
};

export default LeftMenuItem;