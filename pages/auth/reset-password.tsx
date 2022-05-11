import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Api from "../../utils/api";
import IError from "../../models/IError";
import { useRouter } from "next/router";
import ResetPasswordForm, { IFormInputs } from "../../components/ResetPasswordForm";

const ResetPassword = () => {
    const [error, setError] = React.useState<IError | null>(null);
    const router = useRouter();
    const { token } = router.query;

    const handleSubmit = async (payload: IFormInputs) => {
        try {
            console.log(token);
          Api().user.resetPassword(token!.toString(), payload);
        } catch (e) {
          setError((e as IError));
        }
      };

        return (
            <MainLayout className={"main-layout--white"} hideLeftMenu>
                <ResetPasswordForm onSubmit={handleSubmit} error={error}/>
            </MainLayout>
        );
};

export default ResetPassword
