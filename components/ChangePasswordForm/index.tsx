import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useRouter } from 'next/router'
import { ChangePasswordFormSchema } from "../../utils/validations";
import FormField from "../FormField";
import React, { FC } from "react";
import Api from "../../utils/api";

import IError from "../../models/IError";
import {Alert, Box, Button, Typography } from "@mui/material";


export interface IFormInputs {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}
interface ChangePasswordFormProps {
  onSubmit: (payload: IFormInputs) => Promise<void>,
  error: IError | null
}

const ChangePasswordForm:FC<ChangePasswordFormProps> = ({onSubmit, error}) => {

  const methods = useForm<IFormInputs>({
    resolver: yupResolver(ChangePasswordFormSchema),
  });

  return (
      <Box >
        <Typography sx={{marginBottom: 4}} variant={'h3'} fontWeight='700'>Изменение пароля</Typography>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField name={"password"} label={"Старый пароль"} />
        <FormField name={"newPassword"} label={"Новый пароль"} />
        <FormField name={"repeatNewPassword"} label={"Еще раз новый пароль"} />
        {error?.message && (
         <Alert sx={{ marginBottom: "20px" }} severity={"error"}>
           {error?.message}*/
        </Alert>)
        }
        <Button type='submit' color='primary'>Изменить пароль</Button>
      </form>
    </FormProvider>
      </Box>
  );
};


export default ChangePasswordForm;
