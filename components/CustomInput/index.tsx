import { ChangeEvent, FC, KeyboardEvent, SyntheticEvent } from "react";
import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    paddingLeft: "10px",
  },
  div: {
    width: "100%",
    maxHeight: "100px",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    padding: "10px",
    border: "1px solid #E9E9E9",
    boxSizing: "border-box",
    borderRadius: "4px",
    overflowWrap: "anywhere",
    "&:not(:empty)": {
      "&+$placeholder": {
        display: "none",
      },
    },
  },
  placeholder: {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: -1,
    color: "#B4B4B4",
  },
}));

interface CustomInputProps {
  handleSubmit: (e?: SyntheticEvent) => Promise<void>;
  refDiv: React.RefObject<HTMLDivElement>;
  handleInput: (e: ChangeEvent<HTMLDivElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({
  handleSubmit,
  refDiv,
  handleInput,
}) => {
  const classes = useStyle();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.code === "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box className={classes.root}>
      <div
        className={classes.div}
        ref={refDiv}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        contentEditable={true}
        suppressContentEditableWarning={true}
      />
      {/* {reactStringReplace(value, /:(.+?):/g, (match, i) => (
                    <img
                        draggable={false}
                        className={classes.img}
                        src={`https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-64/${match + ".png"}`} alt="emoji"
                    />
                ))} */}
      <Typography className={classes.placeholder}>Введите сообщение</Typography>
    </Box>
  );
};

export default CustomInput;
