import * as yup from "yup"

export const LoginFormSchema = yup.object({
    email: yup.string().required("Email обязателен").email("Введите действительный email"),
    password: yup.string().required("Пароль обязателен").min(8, "Пароль должен быть не менее 8 символов")
})

export const RegistrationFormSchema = yup.object({
    fullName: yup.string().required("Имя и фамилия обязательны")
}).concat(LoginFormSchema)