import React, { FC } from "react";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../Post/Post.module.sass";
import Image from "next/image";
import PostActions from "../PostActions";
import { OutputBlockData } from "@editorjs/editorjs";
import { IPost } from "../../models/IPost";

interface FullPostProps extends IPost {}

const FullPost: FC<FullPostProps> = ({
  id,
  title,
  body,
  tags,
  user,
  views,
  createdAt,
  updatedAt,
}) => {
  console.log(tags);

  const renderBlock = (block: OutputBlockData) => {
    switch (block.type) {
      case "paragraph":
        return (
          <Typography className={styles.text}>{block.data.text}</Typography>
        );
      case "header":
        return (
          <Typography variant={`h${block.data.level}`}>
            {block.data.text}
          </Typography>
        );
      case "list":
        return (
          <List
            style={{ listStyle: "auto" }}
            component={block.data.style === "ordered" ? "ol" : "ul"}
          >
            {block.data.items.map((text: string) => (
              <ListItem style={{ display: "list-item" }}>{text}</ListItem>
            ))}
          </List>
        );
      case "image":
        return <Image src={block.data.file.url} width={500} height={500} />;
    }
  };

  return (
    <Paper className={styles.paper} elevation={3}>
      <Typography className={styles.title} variant={"h5"}>
        {title}
      </Typography>
      <Box className={styles.content}>
        {body?.map(renderBlock)}
        <PostActions />
        <Stack spacing={3} direction={"row"}>
          {tags.split(" ").map((tag) => (
            <Link href={`/search?query=${tag.replace("#", "%23")}`}>
              {
                <Typography
                  sx={{ cursor: "pointer" }}
                  fontSize={24}
                  fontWeight={700}
                >
                  {tag}
                </Typography>
              }
            </Link>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default FullPost;
