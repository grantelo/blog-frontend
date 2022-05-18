import { Box, InputAdornment, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useState } from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IDialog } from "../../models/IDialog";
import { IUser } from "../../models/IUser";
import Dialogs from "../Dialogs";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "319px",
    width: "100%",
    borderRight: "1px solid #F7F7F7",
  },
  headerBox: {
    maxHeight: "60px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "21px 17px",
    borderBottom: "1px solid #F7F7F7",
  },
  headerBoxText: {
    display: "flex",
    alignItems: "center",
    opacity: 0.65,
    fontSize: "14px",
  },
  textField: {
    margin: "22px 0 27px",
    padding: "0 17px",
    display: "flex",
  },
  peopleIcon: {
    marginRight: "7px",
  },
}));

interface SidebarProps {
  user: IUser;
}

const Sidebar: FC<SidebarProps> = ({ user }) => {
  const classes = useStyle();
  const currentDialogId = useTypedSelector<number>(
    ({ dialog }) => dialog.currentDialogId
  );
  const dialogs = useTypedSelector<IDialog[]>(({ dialog }) => dialog.items);
  const [filter, setFiler] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFiler(e.target.value);
  };

  const checkDialog = (dialog: IDialog, filter: string): boolean => {
    const f = (user: IUser): boolean => {
      console.log("filter");
      console.log(user?.fullName);
      console.log(filter);
      return user?.fullName.startsWith(filter);
    };

    return f(dialog.users.find((item) => item.id !== user.id));
  };

  const filterDialogs = (dialogs: IDialog[]): IDialog[] =>
    dialogs.filter((dialog) => checkDialog(dialog, filter));

  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        {/* <Typography
                    className={classes.headerBoxText}
                >
                    <MyProfile handleUpdateUser={handleUpdateUser}/>
                </Typography> */}
        {/* <CreateDialog /> */}
      </Box>
      <TextField
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder={"Поиск среди контактов"}
        onChange={handleChange}
      />
      <Dialogs
        user={user}
        currentDialogId={currentDialogId}
        dialogs={filterDialogs(dialogs)}
      />
    </Box>
  );
};

export default Sidebar;
