import React from 'react';
import Link from "next/link"
import Image from "next/image"
import {Paper, Typography} from "@mui/material";
import PostActions from "../PostActions";

import styles from "./Post.module.sass"

const Post = () => {
    return (
        <Paper className={styles.paper} elevation={3}>
            <Link href={`/news/test-123`}>
                <a>
                    <Typography className={styles.title} variant={"h5"}>Первые дни в литве</Typography>
                    <Typography className={styles.text}>
                        Пока одни не могли соотнести размеры животного и окружения, другие начали создавать
                        апокалиптические сюжеты с котом в главной роли.
                    </Typography>
                    <Image
                        src={"https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"}
                        height={500}
                        width={600}
                    />
                </a>

            </Link>

            <PostActions />
        </Paper>
    );
};

export default Post;