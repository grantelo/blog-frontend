import React, {FC} from 'react';
import {Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import MainForm from "./forms/MainForm";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from "./AuthDialog.module.sass"

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

    const renderSwitch = (formType: FormType) => {
        switch (formType) {
            case FormType.Main:
                return <MainForm/>
            case FormType.Login:
                return <LoginForm onOpenRegistrationForm={() => setFormType(FormType.Registration)}/>
            case FormType.Registration:
                return <RegistrationForm onOpenLoginForm={() => setFormType(FormType.Login)}/>
        }
    }

    return (
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
    );
};

export default AuthDialog;