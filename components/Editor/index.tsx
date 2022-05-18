import React, { FC } from "react";
import EditorJS, { API, BlockAPI, OutputData } from "@editorjs/editorjs";
import Box from "@mui/material/Box";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import List from "@editorjs/list";

interface EditorProps {
  data: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
}

const Editor: FC<EditorProps> = ({ onChange, data }) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      placeholder: "Введите текст",
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${process.env.NEXT_PUBLIC_API_URL}/file/upload-image`,
            },
            defaultElements: null,
          },
        },
        header: Header,
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
      data: { blocks: data },
      async onChange(api: API, block: BlockAPI) {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });

    return () => {
      console.log("destroy");
      console.log(editor.isReady);
      editor.isReady.then(() => editor.destroy()).catch((e) => console.log(e));
    };
  }, []);

  return <Box id={"editorjs"} />;
};

export default Editor;
