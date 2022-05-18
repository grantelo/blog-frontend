import React, { FC } from "react";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import makeStyles from "@mui/styles/makeStyles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IDialog } from "../../models/IDialog";
import CustomBadge from "../CustomBadge";
import { RequestDeleteDialogAction } from "../../redux/types/dialog";

const useStyle = makeStyles((theme) => ({
  root: {
    maxHeight: "60px",
    display: "flex",
    justifyContent: "center",
    padding: "12px 0",
    borderBottom: "1px solid #F7F7F7",
    position: "relative",
    boxSizing: "border-box",
  },
  name: {
    fontWeight: 600,
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    opacity: "0.3",
    marginLeft: "10px",
  },
  menuBox: {
    position: "absolute",
    top: "50%",
    right: "35px",
    transform: "translate(-50%, -50%)",
  },
  iconButton: {
    padding: 0,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: "6px",
    minWidth: 0,
    height: "6px",
    backgroundColor: "#44b700",
    top: "-4px",
  },
}))(Badge);

interface StatusProps {
  name?: string;
  isOnline?: boolean;
  handleDeleteDialog: (dialogId: number) => RequestDeleteDialogAction;
  currentDialog: IDialog;
}

const Status: FC<StatusProps> = ({
  name,
  isOnline,
  handleDeleteDialog,
  currentDialog,
  handleLogoutUser,
}) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  console.log("status");
  console.log(isOnline);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onDeleteDialog = (): void => {
    handleClose();
    handleDeleteDialog(currentDialog?.id);
  };

  const onLogout = () => {
    handleClose();
    handleLogoutUser();
  };

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.name}>{name}</Typography>
        <Box className={classes.box}>
          <CustomBadge isOnline={isOnline} />
          <Typography className={classes.status}>
            {isOnline ? "Онлайн" : "Оффлайн"}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.menuBox}>
        <IconButton className={classes.iconButton} onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {currentDialog && (
            <MenuItem onClick={onDeleteDialog}>Удалить диалог</MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default Status;
