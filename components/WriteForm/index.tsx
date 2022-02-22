import React, {FC} from 'react';
import dynamic from "next/dynamic";
import {Box, Button, InputBase} from "@mui/material";

import styles from "./WriteForm.module.sass"
import {OutputData} from "@editorjs/editorjs";
import useInput from "../../hooks/useInput";
import {bindActionCreators} from "redux";
import * as PostActionCreators from "../../redux/actions/post";
import {useDispatch} from "react-redux";
import {CreatePostRequest} from "../../models/request/CreatePostRequest";
import useTypedSelector from "../../hooks/useTypedSelector";
import {Router} from "next/router";
import {IPost} from "../../models/IPost";


const Editor = dynamic(
    () => import("../Editor"),
    {ssr: false}
)

interface WriteFormProps {
    post?: IPost
}

const WriteForm: FC<WriteFormProps> = ({post}) => {
    const [blocks, setBlocks] = React.useState<OutputData["blocks"]>(post?.body || [])
    const title = useInput(post?.title)
    const tags = useInput(post?.tags)
    const dispatch = useDispatch()
    const {requestAddPost} = bindActionCreators(PostActionCreators, dispatch)
    const isLoading = useTypedSelector<boolean>(({post}) => post.isLoading)

    const handleAddPost = () => {
        const dto:CreatePostRequest = {
            title: title.value,
            body: blocks,
            tags: tags.value
        }

        requestAddPost(dto)
    }

    const handleChangePost = (blocks: OutputData["blocks"]): void => {
        setBlocks(blocks)
    }

    return (
        <Box className={styles.box}>
            <InputBase
                placeholder={"Введите заголовок"}
                className={styles.inputTitle}
                value={title.value}
                onChange={title.onChange}
            />
            <Box>
                <Editor onChange={handleChangePost}/>
            </Box>
            <InputBase
                placeholder={"#it #apple"}
                className={styles.inputTag}
                value={tags.value}
                onChange={tags.onChange}
            />
            <Button
                variant={"contained"}
                color={"primary"}
                disabled={isLoading}
                onClick={handleAddPost}
            >
                Опубликовать
            </Button>
        </Box>
    );
};

export default WriteForm;
