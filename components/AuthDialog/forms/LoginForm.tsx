import React, { FC, useState } from "react";
import { Alert, Box, Button, Stack } from "@mui/material";
import FormField from "../../FormField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { LoginFormSchema } from "../../../utils/validations";
import { useDispatch } from "react-redux";
import IError from "../../../models/IError";
import LoginRequest from "../../../models/request/LoginRequest";
import { RequestUserLoginAction } from "../../../redux/types/user";
import Api from "../../../utils/api";

interface IFormInputs extends LoginRequest {}

interface LoginFormProps {
  requestUserLoginAction: (payload: LoginRequest) => RequestUserLoginAction;
  onOpenRegistrationForm: () => void;
  onOpenForgotPasswordForm: () => void;
  handleClose: () => void;
  isLoading: boolean;
  error: IError;
}

const LoginForm: FC<LoginFormProps> = ({
  requestUserLoginAction,
  handleClose,
  onOpenRegistrationForm,
  onOpenForgotPasswordForm,
  isLoading,
  error
}) => {
  const dispatch = useDispatch();

  const methods = useForm<IFormInputs>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (payload: IFormInputs) => {
    console.log("dsdas");
    requestUserLoginAction(payload);
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField name={"email"} label={"Почта"} />
        <FormField name={"password"} label={"Пароль"} />
        {error?.message && (
          <Alert sx={{ marginBottom: "20px" }} severity={"error"}>
            {error?.message}
          </Alert>
        )}
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={'flex-start'}>
          <Button type={"submit"} variant={"contained"} color={"primary"}>
            Войти
          </Button>
          <Stack>
          <Button
            onClick={onOpenRegistrationForm}
            disabled={isLoading}
            variant={"text"}
            color={"primary"}
          >
            Регистрация
          </Button>
          <Button
            onClick={onOpenForgotPasswordForm}
            disabled={isLoading}
            variant={"text"}
            color={"primary"}
          >
            Забыл пароль
          </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
