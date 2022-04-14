import * as yup from "yup";

export const LoginFormSchema = yup.object({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите действительный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен быть не менее 8 символов"),
});

export const RegistrationFormSchema = yup
  .object({
    fullName: yup.string().required("Имя и фамилия обязательны"),
  })
  .concat(LoginFormSchema);

export const ChangePasswordFormSchema = yup.object({
  password: yup
    .string()
    .required("Требуется старый пароль")
    .min(8, "Пароль должен быть не менее 8 символов"),
  newPassword: yup
    .string()
    .required("Требуется новый пароль")
    .min(8, "Пароль должен быть не менее 8 символов")
    .notOneOf(
      [yup.ref("password")],
      "Новый пароль должен отличаться от старого"
    ),
  repeatNewPassword: yup
    .string()
    .required("Требуется новый пароль")
    .min(8, "Пароль должен быть не менее 8 символов")
    .oneOf([yup.ref("newPassword")], "Пароли должны совпадать"),
});
