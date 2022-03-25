import React, { FC } from 'react';
import {Box, Button, InputBase} from "@mui/material";

import styles from "./EditCommentForm.module.sass"

interface AddCommentFormProps {
    initialText: string,
    onEditComment: (text: string) => void,
    isSubmiting: boolean
    handleClose: () => void;
}

const EditCommentForm: FC<AddCommentFormProps> = ({initialText, onEditComment, isSubmiting, handleClose}) => {
    const [text, setText] = React.useState<string>(initialText)
    const [firstEdit, setFirstEdit] = React.useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!firstEdit) setFirstEdit(true)

        setText(e.target.value)
    }

    const onEdit = () => {
        onEditComment(text)
    }

    return (
        <Box className={styles.box}>
            <InputBase
                onChange={handleChange}
                value={text}
                fullWidth
                multiline
            />
            <Button
                className={styles.button}
                onClick={onEdit}
                disabled={!firstEdit || isSubmiting || !text}
                variant={"contained"}
                color={"primary"}
            >Редактировать</Button>
            <Button
                className={styles.button}
                onClick={handleClose}
                variant={"contained"}
                color={"primary"}
            >Отмена</Button>
        </Box>
    );
};

export default EditCommentForm;
