import React, {FC} from 'react';
import * as _ from "lodash"
import {bindActionCreators} from "redux";
import {Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import MainForm from "./forms/MainForm";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as UserActionCreators from "../../redux/actions/user"

import styles from "./AuthDialog.module.sass"
import useTypedSelector from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {UserState} from "../../redux/types/user";


interface AuthDialogProps {
    open: boolean;
    handleClose: () => void
}

enum FormType {
    Main,
    Registration,
    Login
}

const AuthDialog: FC<AuthDialogProps> = ({open, handleClose}) => {
    const [formType, setFormType] = React.useState<FormType>(FormType.Login)
    const dispatch = useDispatch()
    const {requestUserLoginAction, requestUserRegistrationAction} = bindActionCreators(UserActionCreators, dispatch)
    const {user, isLoading, error} = useTypedSelector<UserState>(state => state.user)

    // React.useEffect(() => {
    //     if(!_.isEmpty(user)) handleClose()
    // }, [user])

    const renderSwitch = (formType: FormType) => {
        switch (formType) {
            case FormType.Main:
                return <MainForm/>
            case FormType.Login:
                return <LoginForm requestUserLoginAction={requestUserLoginAction} handleClose={handleClose} isLoading={isLoading} error={error} onOpenRegistrationForm={() => setFormType(FormType.Registration)}/>
            case FormType.Registration:
                return <RegistrationForm requestUserRegistrationAction={requestUserRegistrationAction} handleClose={handleClose} isLoading={isLoading} error={error} onOpenLoginForm={() => setFormType(FormType.Login)}/>
        }
    }



    return (
        <>
            <Dialog
                onClose={handleClose}
                open={open}
                fullWidth
                maxWidth={"xs"}
            >
                <DialogContent>
                    <Box className={styles.content}>
                        <Typography className={styles.title}>
                            {
                                formType === FormType.Main ? "Вход на"
                                    : <Typography
                                        component="span"
                                        onClick={() => setFormType(FormType.Main)}
                                        className={styles.backTitle}
                                    >
                                        <ArrowBackIcon/> К авторизации
                                    </Typography>
                            }
                        </Typography>
                        {renderSwitch(formType)}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthDialog;