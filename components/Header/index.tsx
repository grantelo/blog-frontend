import React from "react";
import Image from "next/image";
import Link from "next/link";
import { bindActionCreators } from "redux";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import * as UserActionCreators from "../../redux/actions/user";

import logo from "../../public/static/img/logo.svg";
import InputSearch from "../InputSearch";

import styles from "./Header.module.sass";
import AuthDialog from "../AuthDialog";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";

const Header = () => {
  const [visibleAuthDialog, setVisibleAuthDialog] =
    React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userData = useTypedSelector(({ user }) => user);
  const dispatch = useDispatch();
  const { requestUserLogoutAction } = bindActionCreators(
    UserActionCreators,
    dispatch
  );
  const open = !!anchorEl;

  const handleCloseAuthDialog = () => {
    setVisibleAuthDialog(false);
  };

  const handleOpenAuthDialog = () => {
    setVisibleAuthDialog(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    requestUserLogoutAction();
  };

  return (
    <Paper className={styles.paper}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction={"row"} spacing={3} alignItems="center">
          <Link href={"/"}>
            <a>
              <Image src={logo} width={32} height={50} />
            </a>
          </Link>
          <InputSearch />
          <Link href={"/write"}>
            <a>
              <Button className={styles.button} variant={"contained"}>
                Новая запись
              </Button>
            </a>
          </Link>
        </Stack>
        <Stack direction={"row"}>
          <IconButton>
            <SmsOutlinedIcon />
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          {userData.isAuth ? (
            <Box>
              <Avatar
                sx={{ cursor: "pointer" }}
                onClick={handleClick}
                src={userData.user.avatar}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box className={styles.loginButton} onClick={handleOpenAuthDialog}>
              <AccountCircleOutlinedIcon />
              <Typography>Войти</Typography>
            </Box>
          )}
        </Stack>
      </Stack>
      <AuthDialog
        open={visibleAuthDialog}
        handleClose={handleCloseAuthDialog}
      />
    </Paper>
  );
};

export default Header;
