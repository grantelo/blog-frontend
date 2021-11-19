import React, {FC} from 'react';
import {Alert, Button, Stack} from "@mui/material";
import FormField from "../../FormField";
import * as yup from "yup";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginFormSchema} from '../../../utils/validations';
import {useDispatch} from "react-redux";
import IError from "../../../models/IError";
import LoginRequest from "../../../models/request/LoginRequest";
import {RequestUserLoginAction} from "../../../redux/types/user";


interface IFormInputs extends LoginRequest {}

interface LoginFormProps {
    requestUserLoginAction: (payload: LoginRequest) => RequestUserLoginAction,
    onOpenRegistrationForm: () => void,
    handleClose: () => void
    error: IError
}

const LoginForm: FC<LoginFormProps> = ({requestUserLoginAction, handleClose, onOpenRegistrationForm, error}) => {
    const dispatch = useDispatch()

    const methods = useForm<IFormInputs>({
        resolver: yupResolver(LoginFormSchema)
    });

    const onSubmit = async (payload: IFormInputs) => {
        handleClose()
        requestUserLoginAction(payload)
    }

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormField
                    name={"email"}
                    label={"Почта"}
                />
                <FormField
                    name={"password"}
                    label={"Пароль"}
                />
                {error?.message && <Alert sx={{marginBottom: "20px"}} severity={"error"}>{error?.message}</Alert>}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                >
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        color={"primary"}
                    >
                        Войти
                    </Button>
                    <Button
                        onClick={onOpenRegistrationForm}
                        variant={"text"}
                        color={"primary"}
                    >
                        Регистрация
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default LoginForm;