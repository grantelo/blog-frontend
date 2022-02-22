import React, {FC} from 'react';
import EditorJS, {API, BlockAPI, OutputData} from "@editorjs/editorjs";
import ImageTool from '@editorjs/image';
import Header from "@editorjs/header"
import Checklist from "@editorjs/checklist"
import List from '@editorjs/list';
import {Box} from "@mui/system";
import insert from "react-hook-form/dist/utils/insert";
import {OutputBlockData} from "@editorjs/editorjs/types/data-formats/output-data";

interface EditorProps {
    onChange: (blocks: OutputData["blocks"]) => void
}

const Editor: FC<EditorProps> = ({onChange}) => {
    React.useEffect(() => {
        const editor = new EditorJS({
            placeholder: "Введите текст",
            tools: {
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: "http://localhost:5000/post/upload-image"
                        }
                    }
                },
                header: Header,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
            },
            async onChange(api: API, block: BlockAPI) {
                const {blocks} = await editor.save()

                onChange(blocks)
            }
        })

        return () => {
            editor.isReady
                .then(() => editor.destroy())
                .catch(e => console.log(e))
        }
    }, [])

    return (
        <Box id={"editorjs"}/>
    )
};

export default Editor;
