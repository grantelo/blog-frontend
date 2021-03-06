import { Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

import Dialog from "../../components/Dialog";
import Sidebar from "../../components/Sidebar";
import useTypedSelector from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { IDialog } from "../../models/IDialog";
import IError from "../../models/IError";
import { IUser } from "../../models/IUser";
import * as DialogActionCreators from "../../redux/actions/dialog";
import {
  requestDialogsError,
  requestDialogsSuccess,
  setCurrentDialog,
} from "../../redux/actions/dialog";
import { wrapper } from "../../redux/store";
import * as SocketActionCreators from "../../redux/actions/socket";
import Api from "../../utils/api";
import { useEffect } from "react";
import _ from "lodash";
import { useRouter } from "next/router";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
  },
}));

const Dialogs = () => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const { requestDialogs, setCurrentDialog, setSocket } = bindActionCreators(
    Object.assign({}, DialogActionCreators, SocketActionCreators),
    dispatch
  );

  const user: IUser = useTypedSelector<IUser>(({ user }) => user.user);
  const isActivated: boolean = useTypedSelector<boolean>(
    ({ user }) => user.user.isActivated
  );
  const currentDialogId = useTypedSelector<number>(
    ({ dialog }) => dialog.currentDialogId
  );
  const dialogs = useTypedSelector<IDialog[]>(({ dialog }) => dialog.items);
  const currentDialog: IDialog = _.find(dialogs, { id: currentDialogId })!;

  console.log("currentDialog");
  console.log(currentDialog.users);
  const socket: Socket | null = useTypedSelector<Socket | null>(
    ({ socket }) => socket.socket
  );
  const router = useRouter();

  useEffect(() => {
    requestDialogs();
  }, []);

  useEffect(() => {
    const dialogId: number = +router.asPath.split("dialogs/")[1];
    console.log("xxx");
    console.log(dialogId);

    if (!dialogId) return;

    setCurrentDialog(dialogId);
  }, [router.asPath]);

  console.log(socket);

  return (
    <MainLayout fullWidth>
      {socket && (
        <Paper className={classes.root}>
          <Sidebar user={user} />
          <Dialog currentDialog={currentDialog} user={user} socket={socket} />
        </Paper>
      )}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const id = context.params!.id!;
      const response = await Api(context).dialog.findAll();

      store.dispatch(requestDialogsSuccess(response.data));
      console.log("gggggg");
      console.log(id);

      store.dispatch(setCurrentDialog(+id));

      return {
        props: {},
      };
    } catch (e) {
      console.log("ffxxx");
      console.log(e.message);

      store.dispatch(requestDialogsError(e.message as IError));
      return {
        props: {},
      };
    }
  }
);

export default Dialogs;
