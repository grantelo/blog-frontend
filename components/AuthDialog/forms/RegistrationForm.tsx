import React, {FC} from 'react';
import FormField from "../../FormField";
import {Button, Stack} from "@mui/material";
import {FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationFormSchema } from '../../../utils/validations';

interface IFormInputs {
    fullName: string
    email: string
    password: string
}

interface RegistrationFormProps {
    onOpenLoginForm: () => void
}

const RegistrationForm: FC<RegistrationFormProps> = ({onOpenLoginForm}) => {
    const methods = useForm<IFormInputs>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    return (
        <FormProvider {...methods}>
            <form>
                <FormField name={"fullName"} label={"Имя и фамилия"}/>
                <FormField name={"email"} label={"Почта"}/>
                <FormField name={"password"} label={"Пароль"}/>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Button variant={"contained"} color={"primary"}>Зарегестрироваться</Button>
                    <Button onClick={onOpenLoginForm} variant={"text"} color={"primary"}>Войти</Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default RegistrationForm;