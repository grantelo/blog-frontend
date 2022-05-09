import { Box, makeStyles } from "@mui/material";
import { NextPage } from "next";
import Dialog from "../../components/Dialog";
import Sidebar from "../../components/Sidebar";
import useTypedSelector from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { IDialog } from "../../models/IDialog";
import IError from "../../models/IError";
import { requestDialogsError, requestDialogsSuccess } from "../../redux/actions/dialog";
import { wrapper } from "../../redux/store";
import { DialogState } from "../../redux/types/dialog";
import Api from "../../utils/api";

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100%"
    }
}))

const Dialogs = () => {
    const {currentDialogId, error, isLoading, items} = useTypedSelector<DialogState>(({dialog}) => dialog)

    return (
      <MainLayout>
        {socket && <Box className={classes.root}>
                    <Sidebar
                        user={user}
                        handleUpdateUser={fetchUpdateUser}
                    />
                    <Dialog
                        currentDialog={currentDialog}
                        user={user}
                        socket={socket}
                        handleLogoutUser={handleLogoutUser}
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