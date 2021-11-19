import React, {FC} from 'react';
import {bindActionCreators} from "redux";
import {Alert, Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import MainForm from "./forms/MainForm";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as UserActionCreators from "../../redux/actions/user"

import styles from "./AuthDialog.module.sass"
import IError from "../../models/IError";
import useTypedSelector from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";


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
    const error: IError = useTypedSelector<IError>(state => state.user.error)

    const renderSwitch = (formType: FormType) => {
        switch (formType) {
            case FormType.Main:
                return <MainForm/>
            case FormType.Login:
                return <LoginForm requestUserLoginAction={requestUserLoginAction} handleClose={handleClose} error={error} onOpenRegistrationForm={() => setFormType(FormType.Registration)}/>
            case FormType.Registration:
                return <RegistrationForm requestUserRegistrationAction={requestUserRegistrationAction} handleClose={handleClose} error={error} onOpenLoginForm={() => setFormType(FormType.Login)}/>
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