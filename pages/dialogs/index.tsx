import { Box, ThemeProvider } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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
import {createTheme} from "@mui/material";


const useStyle = makeStyles(() => ({
    root: {
        display: "flex",
        height: "100%"
    }
}))

const theme = createTheme({})

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
        
        const dialogId: number = +router.asPath.split("dialogs/")[1]
        if(!dialogId) return

        setCurrentDialog(dialogId)
    }, [router.asPath])

    return (
        <ThemeProvider theme={theme}>
      
      <MainLayout fullWidth>
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
      </ThemeProvider>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    try {
        const response = await Api(context).dialog.findAll()

        store.dispatch(requestDialogsSuccess(response.data))

        return {
            props: {}
        }
    }
    catch(e) {
        store.dispatch(requestDialogsError((e.message) as IError))
        return {
            props: {},
          };
    }
})

export default Dialogs


/*
import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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
import { requestDialogsError, requestDialogsSuccess, setCurrentDialog } from "../../redux/actions/dialog";
import { wrapper } from "../../redux/store";
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

    console.log(classes)

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
    }, [router.pathname])

    console.log(socket);
    

    return (
      <MainLayout fullWidth>
        {true && <Box className={classes.root}>
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
        const id = context.params!.id!
        const response = await Api(context).dialog.findAll()

        store.dispatch(requestDialogsSuccess(response.data))
        console.log("gggggg");
        console.log(id)
        
        store.dispatch(setCurrentDialog(+id))

        return {
            props: {}
        }
    }
    catch(e) {
        console.log('ffxxx');
        console.log(e.message);
        
        store.dispatch(requestDialogsError((e.message) as IError))
        return {
            props: {},
          };
    }
})

export default Dialogs
*/