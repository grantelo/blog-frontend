import { Box, makeStyles } from "@mui/material";
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
import { requestDialogsError, requestDialogsSuccess } from "../../redux/actions/dialog";
import { wrapper } from "../../redux/store";
import { DialogState } from "../../redux/types/dialog";
import * as DialogActionCreators from "../../redux/actions/dialog"
import * as SocketActionCreators from "../../redux/actions/socket"
import Api from "../../utils/api";
import { useEffect } from "react";
import _ from "lodash";
import { useRouter } from "next/router";


const useStyle = makeStyles(() => ({
    root: {
        display: "flex",
        height: "100%"
    }
}))

const Dialogs = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const {requestDialogs, setCurrentDialog, setSocket} = bindActionCreators(
        Object.assign({}, DialogActionCreators, SocketActionCreators), dispatch
    )
    
    const user:IUser = useTypedSelector<IUser>(({user}) => user.user)
    const isActivated:boolean = useTypedSelector<boolean>(({user}) => user.user.isActivated)
    const currentDialog:IDialog = useTypedSelector<IDialog>(({dialog}) => _.find(dialog.items, {id: dialog.currentDialogId})!)
    const socket: Socket | null = useTypedSelector<Socket | null>(({socket}) => socket.socket)
    const router = useRouter()
    
    useEffect(() => {
        requestDialogs()
        setSocket(user.id)
    }, [])

    useEffect(() => {
        const dialogId: number = +router.pathname.split("dialogs/")[1]
        if(!dialogId) return

        setCurrentDialog(dialogId)
    }, [location.pathname])

    return (
      <MainLayout>
        {socket && <Box className={classes.root}>
                    <Sidebar
                        user={user}
                    />
                    <Dialog
                        currentDialog={currentDialog}
                        user={user}
                        socket={socket}
                    />
                </Box>}
      </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    try {
        const response = await Api().dialog.findAll()

        store.dispatch(requestDialogsSuccess(response.data))
    }
    catch(e) {
        store.dispatch(requestDialogsError(e as IError))
    }
})

export default Dialogs