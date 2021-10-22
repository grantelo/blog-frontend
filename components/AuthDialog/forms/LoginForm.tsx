import React from 'react';
import {Button, Stack} from "@mui/material";
import FormField from "../../FormField";
import * as yup from "yup";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


interface IFormInputs {
    email: string
    password: string
}

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
}).required()

const LoginForm = () => {
    const methods = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: IFormInputs) => console.log(data)

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