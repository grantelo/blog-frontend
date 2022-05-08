import axios, { AxiosInstance } from "axios";
import LoginRequest from "../../models/request/LoginRequest";
import AuthResponse from "../../models/response/AuthResponse";
import RegistrationRequest from "../../models/request/RegistrationRequest";
import { IUser } from "../../models/IUser";
import { ChangePasswordRequest } from "../../models/request/ChangePasswordRequest";
import { UpdateUserProfileRequest } from "../../models/request/UpdateProfileRequest";
import { baseURL } from "./index";
import { ForgotPasswordRequest } from "../../models/request/ForgotPasswordRequest";
import { ResetPasswordRequest } from "../../models/request/ResetPasswordRequest";

const UserApi = (instance: AxiosInstance) => ({
  getMe: () => instance.get<IUser>("/users/me"),
  login: (user: LoginRequest) =>
    instance.post<AuthResponse>("/auth/login", user),
  registration: (user: RegistrationRequest) =>
    instance.post<RegistrationRequest>("/auth/register", user),
  checkAuthUser: () =>
    axios.get<AuthResponse>(`${baseURL}/auth/refresh`, {
      withCredentials: true,
    }),
  changePassword: (token: string, dto: ChangePasswordRequest) =>
    axios.post<ChangePasswordRequest>(
      `${baseURL}/auth/change-password`,
      dto
    ),
    resetPassword: (token: string, dto: ResetPasswordRequest) => {
      console.log("reset");
      
    axios.post<ChangePasswordRequest>(
      `${baseURL}/auth/reset-password?token=${token}`,
      dto
    )
    },
    forgotPassword: (dto: ForgotPasswordRequest) => axios.post(`${baseURL}/auth/forgot-password`, dto),
  updateProfile: (dto: UpdateUserProfileRequest) =>
    instance.patch<IUser>("/users", dto),
  profile: () => instance.get<IUser>('/users/profile')
});

export default UserApi;
