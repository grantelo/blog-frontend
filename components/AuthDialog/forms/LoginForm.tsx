import React, {FC} from 'react';
import {Alert, Button, Stack} from "@mui/material";
import FormField from "../../FormField";
import * as yup from "yup";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoginFormSchema} from '../../../utils/validations';
import {useDispatch} from "react-redux";
import IError from "../../../models/IError";
import LoginRequest from "../../../models/request/LoginRequest";
import {RequestUserLoginAction} from "../../../redux/types/user";
import {IUser} from "../../../models/IUser";


interface IFormInputs extends LoginRequest {}

interface LoginFormProps {
    requestUserLoginAction: (payload: LoginRequest) => RequestUserLoginAction,
    onOpenRegistrationForm: () => void,
    handleClose: () => void,
    isLoading: boolean,
    error: IError
}

const LoginForm: FC<LoginFormProps> = ({requestUserLoginAction, handleClose, onOpenRegistrationForm, isLoading, error}) => {
    const dispatch = useDispatch()

    const methods = useForm<IFormInputs>({
        resolver: yupResolver(LoginFormSchema)
    });

    const onSubmit = async (payload: IFormInputs) => {
        console.log("dsdas")
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
                        disabled={isLoading}
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
