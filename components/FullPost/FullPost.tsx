import React, {FC} from 'react';
import {Box, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import styles from "../Post/Post.module.sass";
import Image from "next/image";
import PostActions from "../PostActions";
import {OutputBlockData, OutputData} from '@editorjs/editorjs';
import {IPost} from '../../models/IPost';

interface FullPostProps extends IPost {
}

const FullPost: FC<FullPostProps> = ({id, title, body, tags, user, views, createdAt, updatedAt}) => {
    console.log(body)

    const renderBlock = (block: OutputBlockData) => {
        switch (block.type) {
            case "paragraph":
                return <Typography className={styles.text}>{block.data.text}</Typography>
            case "header":
                return <Typography variant={`h${block.data.level}`}>{block.data.text}</Typography>
            case "list":
                return (
                    <List style={{listStyle: "auto"}} component={block.data.style === "ordered" ? "ol" : "ul"}>
                        {block.data.items.map((text: string) => <ListItem style={{display: "list-item"}}>{text}</ListItem>)}
                    </List>
                )
            case "image":
                return (<Image
                    src={block.data.file.url}
                    width={500}
                    height={500}
                />)
        }
    }

    return (
        <Paper
            className={styles.paper}
            elevation={3}
        >
            <Typography
                className={styles.title}
                variant={"h5"}
            >
                {title}
            </Typography>
            <Box className={styles.content}>
                {body?.map(renderBlock)}
            </Box>
            {/*<Typography className={styles.text}>*/}
            {/*    Пока одни не могли соотнести размеры животного и окружения, другие начали создавать*/}
            {/*    апокалиптические сюжеты с котом в главной роли.*/}
            {/*</Typography>*/}
            {/*<Image*/}
            {/*    src={"https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"}*/}
            {/*    height={500}*/}
            {/*    width={600}*/}
            {/*/>*/}
            <PostActions/>
        </Paper>
    );
};

export default FullPost;
