import React, {FC} from 'react';
import FormField from "../../FormField";
import {Alert, Button, Stack} from "@mui/material";
import {FormProvider, useForm, useFormState} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationFormSchema } from '../../../utils/validations';
import IError from "../../../models/IError";
import {RequestUserRegistrationAction} from "../../../redux/types/user";
import RegistrationRequest from "../../../models/request/RegistrationRequest";

interface IFormInputs extends RegistrationRequest {}

interface RegistrationFormProps {
    requestUserRegistrationAction: (payload: RegistrationRequest) => RequestUserRegistrationAction,
    onOpenLoginForm: () => void,
    handleClose: () => void,
    isLoading: boolean
    error: IError
}

const RegistrationForm: FC<RegistrationFormProps> = ({requestUserRegistrationAction, onOpenLoginForm, isLoading, error}) => {
    const methods = useForm<IFormInputs>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = (payload: RegistrationRequest) => {
        requestUserRegistrationAction(payload)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormField name={"fullName"} label={"Имя и фамилия"}/>
                <FormField name={"email"} label={"Почта"}/>
                <FormField name={"password"} label={"Пароль"}/>
                {error.message && <Alert sx={{marginBottom: "20px"}} severity={"error"}>{error.message.map(Object.values)}</Alert>}
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"} disabled={isLoading}>Зарегестрироваться</Button>
                    <Button onClick={onOpenLoginForm} disabled={isLoading} variant={"text"} color={"primary"}>Войти</Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default RegistrationForm;