import React, {FC, useState} from 'react';
import FormField from "../../FormField";
import {Alert, Button, Stack} from "@mui/material";
import {FormProvider, useForm, useFormState} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ForgotPasswordFormSchema, RegistrationFormSchema } from '../../../utils/validations';
import IError from "../../../models/IError";
import { ForgotPasswordRequest } from '../../../models/request/ForgotPasswordRequest';
import Api from '../../../utils/api';

interface IFormInputs extends ForgotPasswordRequest {}

const ForgotPasswordForm: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<IError | null>(null)

    const methods = useForm<IFormInputs>({
        resolver: yupResolver(ForgotPasswordFormSchema)
    });

    const onSubmit = async (payload: IFormInputs) => {
        try {
            setIsLoading(true)
            const response = await Api().user.forgotPassword(payload)
            console.log(response.data.message)
        } catch(e) {
            setError(e as IError)
        }
        finally {
          setIsLoading(false)
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormField name={"email"} label={"Почта"}/>
                {error?.message && <Alert sx={{marginBottom: "20px"}} severity={"error"}>{error.message}</Alert>}
                <Button type={"submit"} variant={"contained"} color={"primary"} disabled={isLoading}>Восстановить</Button>
            </form>
        </FormProvider>
    );
};

export default ForgotPasswordForm;