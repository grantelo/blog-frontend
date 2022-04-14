import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ChangePasswordFormSchema } from "../../utils/validations";
import FormField from "../FormField";
import React from "react";
import Api from "../../utils/api";
import { useRouter } from "next/router";
import IError from "../../models/IError";

interface IFormInputs {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

const ChangePasswordForm = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(ChangePasswordFormSchema),
  });

  const onSubmit = async (payload: IFormInputs) => {
    try {
      const { token } = router.query;
      await Api().user.changePassword(token!.toString(), payload);
    } catch (e) {
      setError((e as IError).message.toString());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField name={"password"} label={"Старый пароль"} />
        <FormField name={"newPassword"} label={"Новый пароль"} />
        <FormField name={"repeatNewPassword"} label={"Еще раз новый пароль"} />
        {/*{error?.message && (*/}
        {/*  <Alert sx={{ marginBottom: "20px" }} severity={"error"}>*/}
        {/*    {error?.message}*/}
        {/*  </Alert>*/}
        {/*)}*/}
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
