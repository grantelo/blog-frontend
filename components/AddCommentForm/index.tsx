import React, { FC } from 'react';
import {Box, Button, InputBase} from "@mui/material";

import styles from "./AddCommentForm.module.sass"

interface AddCommentFormProps {
    onAddComment: (text: string) => void,
    isSubmiting: boolean
}

const AddCommentForm: FC<AddCommentFormProps> = ({onAddComment, isSubmiting}) => {
    const [activeButton, setActiveButton] = React.useState<boolean>(false)
    const [text, setText] = React.useState<string>("")

    React.useEffect(() => {
        if (activeButton && !isSubmiting) setText("")
    }, [isSubmiting])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleClick = () => {
        setActiveButton(true)
    }

    const onAdd = () => {
        onAddComment(text)
    }

    return (
        <Box className={styles.box}>
            <InputBase
                onClick={handleClick}
                onChange={handleChange}
                value={text}
                placeholder={"Написать комментарий"}
                fullWidth
                multiline
            />
            {activeButton &&
            <Button
                className={styles.button}
                onClick={onAdd}
                disabled={isSubmiting || !text}
                variant={"contained"}
                color={"primary"}
            >Отправить</Button>}
        </Box>
    );
};

export default AddCommentForm;
