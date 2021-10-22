import React from 'react';
import EditorJS from "@editorjs/editorjs";
import {Box} from "@mui/system";


const Editor = () => {
    React.useEffect(() => {
        const editor = new EditorJS({
            placeholder: "Введите текст"
        })

        return () => {
            editor.isReady
                .then(() => editor.destroy())
                .catch(e => console.log(e))
        }
    }, [])

    return (
        <Box id={"editorjs"} />
    )
};

export default Editor;