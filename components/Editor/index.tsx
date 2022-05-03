import React, { FC } from "react";
import EditorJS, { API, BlockAPI, OutputData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import List from "@editorjs/list";

interface EditorProps {
  onChange: (blocks: OutputData["blocks"]) => void;
}

const Editor: FC<EditorProps> = ({ onChange }) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      placeholder: "Введите текст",
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${process.env.NEXT_PUBLIC_ANALYTICS_ID}/file/upload-image`,
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
      async onChange(api: API, block: BlockAPI) {
        const { blocks } = await editor.save();

        onChange(blocks);
      },
    });

    return () => {
      editor.isReady.then(() => editor.destroy()).catch((e) => console.log(e));
    };
  }, []);

  return <Box id={"editorjs"} />;
};

export default Editor;
