import React from 'react';
import FormField from "../../FormField";
import {Button, Stack} from "@mui/material";

const RegistrationForm = () => {
    return (
        <form>
            <FormField name={"fullName"} label={"Имя и фамилия"}/>
            <FormField name={"email"} label={"Почта"}/>
            <FormField name={"password"} label={"Пароль"}/>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button variant={"contained"} color={"primary"}>Зарегестрироваться</Button>
                <Button variant={"text"} color={"primary"}>Войти</Button>
            </Stack>
        </form>
    );
};

export default RegistrationForm;