import React, {FC} from 'react';
import Link from "next/link"
import Image from "next/image"
import {Paper, Typography} from "@mui/material";
import PostActions from "../PostActions";

import styles from "./Post.module.sass"
import { OutputData } from '@editorjs/editorjs';

interface PostProps {
    id: number,
    title: string,
    body: OutputData["blocks"],
    tags: string
}

const Post: FC<PostProps> = ({id, title, body, tags}) => {
    const firstParagraph = body.find(block => block.type === "paragraph")?.data?.text
    const firstImage = body.find(block => block.type === "image")?.data?.file?.url

    return (
        <Paper className={styles.paper} elevation={3}>
            <Link href={`/news/${id}`}>
                <a>
                    <Typography className={styles.title} variant={"h5"}>{title}</Typography>
                    <Typography className={styles.text}>
                        {firstParagraph}
                    </Typography>
                    {firstImage && <Image
                        src={firstImage}
                        height={500}
                        width={600}
                    />}
                </a>

            </Link>

            <PostActions />
        </Paper>
    );
};

export default Post;
