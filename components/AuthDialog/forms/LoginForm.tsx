import React, {FC} from 'react';
import {Button, Stack} from "@mui/material";
import FormField from "../../FormField";
import * as yup from "yup";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { LoginFormSchema } from '../../../utils/validations';


interface IFormInputs {
    email: string
    password: string
}

interface LoginFormProps {
    onOpenRegistrationForm: () => void
}

const LoginForm: FC<LoginFormProps> = ({onOpenRegistrationForm}) => {
    const methods = useForm<IFormInputs>({
        resolver: yupResolver(LoginFormSchema)
    });

    const onSubmit = async (data: IFormInputs) => {
        console.log(data)
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